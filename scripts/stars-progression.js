#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '../src/data/agents-detailed.json');
const DATA_FILE_GIT_PATH = 'src/data/agents-detailed.json';

function findReferenceCommit() {
  // Try commits within the last 30 days first
  let output = execSync(
    `git log --since="30 days ago" --format="%H" -- ${DATA_FILE_GIT_PATH}`,
    { encoding: 'utf8' }
  ).trim();

  if (output) {
    const hashes = output.split('\n').filter(Boolean);
    return hashes[hashes.length - 1]; // oldest in the 30-day window
  }

  // Fall back to all commits
  output = execSync(
    `git log --format="%H" -- ${DATA_FILE_GIT_PATH}`,
    { encoding: 'utf8' }
  ).trim();

  if (!output) {
    throw new Error('No git history found for agents-detailed.json');
  }

  const hashes = output.split('\n').filter(Boolean);
  return hashes[hashes.length - 1]; // oldest commit ever
}

function getCommitDate(hash) {
  return execSync(`git show -s --format="%ci" ${hash}`, { encoding: 'utf8' }).trim().split(' ')[0];
}

function loadHistoricalData(hash) {
  const json = execSync(`git show ${hash}:${DATA_FILE_GIT_PATH}`, { encoding: 'utf8' });
  const data = JSON.parse(json);
  // Support both old format (plain array) and new format ({ agents: [...] })
  const agents = Array.isArray(data) ? data : data.agents;
  const map = new Map();
  for (const agent of agents) {
    if (agent.ghStars?.value !== null && agent.ghStars?.value !== undefined) {
      map.set(agent.name, agent.ghStars.value);
    }
  }
  return map;
}

function loadCurrentData() {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  const map = new Map();
  for (const agent of data.agents) {
    if (agent.ghStars?.value !== null && agent.ghStars?.value !== undefined) {
      map.set(agent.name, agent.ghStars.value);
    }
  }
  return map;
}

function main() {
  const refHash = findReferenceCommit();
  const refDate = getCommitDate(refHash);

  const historical = loadHistoricalData(refHash);
  const current = loadCurrentData();

  const progressions = [];
  for (const [name, currentStars] of current) {
    if (!historical.has(name)) continue;
    const delta = currentStars - historical.get(name);
    if (delta > 0) {
      progressions.push({ name, delta, total: currentStars });
    }
  }

  progressions.sort((a, b) => b.delta - a.delta);

  console.log(`GitHub Stars Progression (since ${refDate})`);
  console.log('='.repeat(45));

  if (progressions.length === 0) {
    console.log('No positive progressions found.');
    return;
  }

  const rankWidth = String(progressions.length).length + 1;
  progressions.forEach(({ name, delta, total }, i) => {
    const rank = `#${i + 1}`.padStart(rankWidth + 1);
    const deltaStr = `+${delta.toLocaleString()}`;
    const totalStr = `(${total.toLocaleString()} total)`;
    console.log(` ${rank}  ${name.padEnd(28)} ${deltaStr.padStart(8)}  ${totalStr}`);
  });
}

main();
