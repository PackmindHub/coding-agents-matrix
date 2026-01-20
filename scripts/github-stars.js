#!/usr/bin/env node

import { Octokit } from 'octokit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '../src/data/agents-detailed.json');
const BACKUP_DIR = path.join(__dirname, '../backups');

/**
 * Parse GitHub URL to extract owner and repo
 * @param {string} url - GitHub repository URL
 * @returns {{owner: string, repo: string} | null}
 */
function parseGitHubUrl(url) {
  if (!url) return null;

  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) return null;

  const owner = match[1];
  let repo = match[2].replace('.git', '');

  // Remove trailing slash if present
  repo = repo.replace(/\/$/, '');

  return { owner, repo };
}

/**
 * Create a backup of the data file
 * @param {string} dataFile - Path to the data file
 * @returns {string} - Path to the backup file
 */
function createBackup(dataFile) {
  // Create backups directory if it doesn't exist
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = path.join(BACKUP_DIR, `agents-detailed-${timestamp}.json`);

  fs.copyFileSync(dataFile, backupFile);
  console.log(`✓ Backup created: ${backupFile}`);

  return backupFile;
}

/**
 * Fetch star count for a GitHub repository
 * @param {Octokit} octokit - Octokit instance
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @returns {Promise<number | null>}
 */
async function fetchStarCount(octokit, owner, repo) {
  try {
    const response = await octokit.rest.repos.get({
      owner,
      repo,
    });

    return response.data.stargazers_count;
  } catch (error) {
    if (error.status === 404) {
      console.warn(`⚠ Repository not found: ${owner}/${repo}`);
      return null;
    } else if (error.status === 403) {
      // Rate limit exceeded
      const resetTime = error.response?.headers?.['x-ratelimit-reset'];
      if (resetTime) {
        const resetDate = new Date(resetTime * 1000);
        console.error(`✗ Rate limit exceeded. Resets at: ${resetDate.toLocaleString()}`);
      } else {
        console.error('✗ Rate limit exceeded');
      }
      throw error;
    } else {
      console.error(`✗ Error fetching ${owner}/${repo}:`, error.message);
      // Retry once after a short delay
      console.log('  Retrying in 2 seconds...');
      await new Promise(resolve => setTimeout(resolve, 2000));

      try {
        const response = await octokit.rest.repos.get({
          owner,
          repo,
        });
        return response.data.stargazers_count;
      } catch (retryError) {
        console.error(`  Retry failed: ${retryError.message}`);
        return null;
      }
    }
  }
}

/**
 * Main function to update GitHub stars
 */
async function main() {
  console.log('GitHub Stars Fetcher');
  console.log('====================\n');

  // Read the data file
  console.log('Reading data file...');
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  console.log(`✓ Found ${data.length} agents\n`);

  // Create backup
  createBackup(DATA_FILE);
  console.log();

  // Initialize Octokit (unauthenticated)
  const octokit = new Octokit();

  // Get rate limit info
  try {
    const { data: rateLimit } = await octokit.rest.rateLimit.get();
    const remaining = rateLimit.rate.remaining;
    const limit = rateLimit.rate.limit;
    console.log(`Rate limit: ${remaining}/${limit} requests remaining\n`);
  } catch (error) {
    console.warn('Could not fetch rate limit info\n');
  }

  // Count agents with GitHub URLs
  const agentsWithGithub = data.filter(agent =>
    agent.github?.value
  );
  console.log(`Found ${agentsWithGithub.length} agents with GitHub URLs\n`);

  // Update timestamp
  const timestamp = new Date().toISOString().split('T')[0];

  // Fetch stars for each open source agent
  let successCount = 0;
  let errorCount = 0;

  for (const agent of data) {
    if (agent.github?.value) {
      const parsed = parseGitHubUrl(agent.github.value);

      if (!parsed) {
        console.warn(`⚠ Invalid GitHub URL for ${agent.name}: ${agent.github.value}`);
        errorCount++;
        continue;
      }

      console.log(`Fetching stars for ${agent.name} (${parsed.owner}/${parsed.repo})...`);

      const stars = await fetchStarCount(octokit, parsed.owner, parsed.repo);

      if (stars !== null) {
        agent.ghStars.value = stars;
        agent.ghStars.detail = `Last updated: ${timestamp}`;
        console.log(`✓ ${agent.name}: ${stars.toLocaleString()} stars\n`);
        successCount++;
      } else {
        console.log(`✗ Could not fetch stars for ${agent.name}\n`);
        errorCount++;
      }

      // Small delay to avoid hitting rate limits
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // Write updated data back to file
  console.log('Writing updated data...');
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`✓ Data file updated\n`);

  // Summary
  console.log('Summary');
  console.log('=======');
  console.log(`Total agents with GitHub URLs: ${agentsWithGithub.length}`);
  console.log(`Successfully updated: ${successCount}`);
  console.log(`Errors: ${errorCount}`);

  if (errorCount > 0) {
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  console.error('\n✗ Fatal error:', error.message);
  process.exit(1);
});
