---
name: Update Existing Agent
about: Update information for an existing agent in the comparison matrix
title: "[UPDATE] Agent Name"
labels: "update, agent-data"
---

# Update Existing Agent

Thank you for helping keep the agents-board data accurate and up-to-date! Use this template to propose updates to any agent's information.

**Before submitting:**
- Review the [Agent Properties Terminology](https://github.com/anthropics/agents-board#agent-properties-terminology) in the README
- Check the current agent data in `/src/data/agents-detailed.json`
- Only include properties that need updating (leave others unchecked)

---

## Agent to Update

**Agent Name:**
<!-- e.g., Aider, Claude Code, Cursor -->

**Brief Description of Changes:**
<!-- Describe what you're updating and why -->

---

## Properties to Update

Check the boxes for properties you want to update, then fill in the current and new values.

### Core Properties

- [ ] **Name**
  - Current value:
  - New value:

- [ ] **Type**
  - Current value: <!-- Open Source OR Proprietary -->
  - New value: <!-- Open Source OR Proprietary -->

### GitHub Properties

- [ ] **GitHub URL** (`github`)
  - Current value:
  - New value:
  - Detail:

> **Note:** GitHub Stars (`ghStars`) are auto-updated by a script. Do not manually update them.

### Features

Each feature has a **value** (yes/no/partial/null) and an optional **detail** field for additional context.

- [ ] **CLI** (`cli`)
  - Current value: <!-- yes/no/partial/null -->
  - New value: <!-- yes/no/partial/null -->
  - Detail:

- [ ] **Dedicated IDE** (`dedicatedIde`)
  - Current value: <!-- yes/no/partial/null -->
  - New value: <!-- yes/no/partial/null -->
  - Detail:

- [ ] **Bring Your Own LLM** (`byoLlm`)
  - Current value: <!-- yes/no/partial/null -->
  - New value: <!-- yes/no/partial/null -->
  - Detail:

- [ ] **MCP Support** (`mcpSupport`)
  - Current value: <!-- yes/no/partial/null -->
  - New value: <!-- yes/no/partial/null -->
  - Detail:

- [ ] **Custom Rules** (`customRules`)
  - Current value: <!-- yes/no/partial/null -->
  - New value: <!-- yes/no/partial/null -->
  - Detail:

- [ ] **AGENTS.md Support** (`agentsMdSupport`)
  - Current value: <!-- yes/no/partial/null -->
  - New value: <!-- yes/no/partial/null -->
  - Detail:

- [ ] **Agent Skills Support** (`agentSkillsSupport`)
  - Current value: <!-- yes/no/partial/null -->
  - New value: <!-- yes/no/partial/null -->
  - Detail:

- [ ] **Commands/Reusable Prompts** (`commandsReusablePrompts`)
  - Current value: <!-- yes/no/partial/null -->
  - New value: <!-- yes/no/partial/null -->
  - Detail:

- [ ] **Sub-agents Support** (`subagentsSupport`)
  - Current value: <!-- yes/no/partial/null -->
  - New value: <!-- yes/no/partial/null -->
  - Detail:

### Additional Information

- [ ] **Additional Info** (`additionalInfo`)
  - Current value:
  - New value:

---

## Supporting Evidence

Please provide links or references that support your proposed changes:

<!-- Add documentation links, release notes, screenshots, etc. -->

---

## Pre-submission Checklist

- [ ] I have verified the current values in `/src/data/agents-detailed.json`
- [ ] I have reviewed the [Agent Properties Terminology](https://github.com/anthropics/agents-board#agent-properties-terminology)
- [ ] I have provided evidence or sources for the proposed changes
- [ ] My proposed values follow the correct format (yes/no/partial/null for features)
- [ ] I have filled in the agent name in the issue title
