---
name: Add New Agent
about: Submit a new AI coding agent to the comparison matrix
title: "[NEW] Agent Name"
labels: "new-agent, needs-review"
---

# Add New Agent

Thank you for contributing to coding-agents-matrix! Use this template to submit a new AI coding agent for inclusion in the comparison matrix.

**Before submitting:**
- Review the [Agent Properties Terminology](https://github.com/PackmindHub/coding-agents-matrix#agent-properties-terminology) in the README
- Explore existing agents in `/src/data/agents-detailed.json` for examples
- Required fields are marked with an asterisk (*)

---

## Core Properties

### Agent Name* (required)

**Name:**
<!-- e.g., Aider, Claude Code, Cursor -->

### Type* (required)

**Type:**
<!-- Choose one: "Open Source" OR "Proprietary" -->

**Options:**
- `Open Source` - Source code is publicly available and can be self-hosted
- `Proprietary` - Closed-source commercial product

---

## Links

### Website* (required)

**Website URL:**
<!-- e.g., https://aider.chat -->

**Format:** `https://example.com`

**Examples:**
- Aider: `https://aider.chat`
- Claude Code: `https://claude.ai/claude-code`

### GitHub URL

**GitHub Repository URL:**
<!-- e.g., https://github.com/owner/repo OR null for proprietary agents -->

**Format:** `https://github.com/owner/repo` or `null`

**Example:**
- Open Source: `https://github.com/Aider-AI/aider`
- Proprietary: `null`

### GitHub Stars

**Stars:**
<!-- Leave as null - this is automatically updated by a script -->

`null`

> **Note:** GitHub Stars are automatically populated by `npm run update-stars` script. Always set this to `null` for new submissions.

---

## Release Info

### First Release* (required)

**First Release Date:**
<!-- Format: YYYY-MM, e.g., 2024-01 -->

**Format:** `YYYY-MM` (year and month)

**Detail:** <!-- Optional: e.g., "Technical preview launched" -->

**Examples:**
- Aider: `2023-05`
- Claude Code: `2025-02`
- GitHub Copilot: `2021-06` with detail "Technical preview launched"

---

## Features

For each feature below, provide:
1. **Value**: Must be one of: `yes`, `no`, `partial`, or `null`
2. **Detail**: Optional but encouraged - provide additional context, examples, or clarifications

### 1. CLI (Command Line Interface)

**Definition:** Whether the agent provides a Command Line Interface for terminal-based interaction.

**Value:** <!-- yes/no/partial/null -->

**Detail:** <!-- Optional: Add context, e.g., "Claude Code CLI and interactive terminal mode" -->

**Possible values:**
- `yes` - Full CLI support
- `no` - No CLI available
- `partial` - Limited CLI functionality (e.g., some features require GUI)

**Examples:**
- Aider: `{ "value": "yes", "detail": null }`
- Claude Code: `{ "value": "yes", "detail": "Claude Code CLI and interactive terminal mode" }`

---

### 2. Dedicated IDE

**Definition:** Whether the agent comes with or requires a dedicated Integrated Development Environment.

**Value:** <!-- yes/no/partial/null -->

**Detail:** <!-- Optional: e.g., "Available via web interface and editor integrations" -->

**Possible values:**
- `yes` - Has its own IDE or is an IDE extension that requires a specific IDE
- `no` - Works independently or integrates with any IDE/editor

**Examples:**
- Aider: `{ "value": "no", "detail": null }`
- Claude Code: `{ "value": "no", "detail": "Available via web interface and editor integrations" }`

---

### 3. IDE Extension

**Definition:** Whether the agent is available as an extension/plugin for existing IDEs (VS Code, JetBrains, etc.).

**Value:** <!-- yes/no/partial/null -->

**Detail:** <!-- Optional: e.g., "Available as VS Code and JetBrains extensions" -->

**Possible values:**
- `yes` - Available as IDE extension/plugin
- `no` - Not available as an IDE extension
- `partial` - Limited IDE extension support

**Examples:**
- Aider: `{ "value": "no", "detail": null }`
- Continue: `{ "value": "yes", "detail": "VS Code and JetBrains extensions available" }`

---

### 4. Bring Your Own LLM (byoLlm)

**Definition:** Whether users can configure the agent to use their own choice of Language Model provider (OpenAI, Anthropic, local models, etc.).

**Value:** <!-- yes/no/partial/null -->

**Detail:** <!-- Optional: e.g., "Supports connecting to OpenAI, Anthropic or local models via API keys" -->

**Possible values:**
- `yes` - Supports multiple LLM providers/models
- `no` - Locked to a specific provider
- `partial` - Limited choice or requires specific configuration

**Examples:**
- Aider: `{ "value": "yes", "detail": "Supports connecting to OpenAI, Anthropic or local models via API keys" }`
- Claude Code: `{ "value": "no", "detail": "Tied to Anthropic's Claude models" }`

---

### 5. MCP Support (Model Context Protocol)

**Definition:** Whether the agent implements MCP, an open standard for connecting AI assistants to external data sources and tools.

**Value:** <!-- yes/no/partial/null -->

**Detail:** <!-- Optional: e.g., "Native support for MCP to connect tools; e.g. can use Figma plugin via MCP" -->

**Learn more:** [Model Context Protocol](https://modelcontextprotocol.io/)

**Examples:**
- Aider: `{ "value": "no", "detail": "No built-in MCP client; can be extended via external MCP server integrations" }`
- Claude Code: `{ "value": "yes", "detail": "Native support for MCP to connect tools; e.g. can use Figma plugin via MCP" }`

---

### 6. Custom Rules

**Definition:** Whether the agent allows users to define custom instructions, guidelines, or rules that shape the agent's behavior.

**Value:** <!-- yes/no/partial/null -->

**Detail:** <!-- Optional: e.g., "Supports custom rules via `.claude/rules/` directory and CLAUDE.md" -->

**Examples:**
- Aider: `{ "value": "no", "detail": "No explicit project rules file support beyond user prompts" }`
- Claude Code: `{ "value": "yes", "detail": "Supports custom rules via `.claude/rules/` directory and CLAUDE.md for project conventions" }`

---

### 7. AGENTS.md Support

**Definition:** Whether the agent recognizes and uses `AGENTS.md` files for project-specific instructions and context.

**Value:** <!-- yes/no/partial/null -->

**Detail:** <!-- Optional: e.g., "Uses CLAUDE.md for similar purpose" -->

**Note:** AGENTS.md is an emerging convention for defining agent-specific instructions in a project.

**Examples:**
- Aider: `{ "value": "no", "detail": null }`
- Claude Code: `{ "value": "no", "detail": "Uses CLAUDE.md for similar purpose; AGENTS.md is not natively used by Claude Code" }`

---

### 8. Agent Skills Support

**Definition:** Whether the agent supports installable skills, plugins, or extensions that add new capabilities or specialized behaviors.

**Value:** <!-- yes/no/partial/null -->

**Detail:** <!-- Optional: e.g., "Supports specialized agents and skills through its plugin system" -->

**Examples:**
- Aider: `{ "value": "no", "detail": null }`
- Claude Code: `{ "value": "yes", "detail": "Supports specialized agents and skills through its plugin system" }`

---

### 9. Commands/Reusable Prompts

**Definition:** Whether the agent supports slash commands, saved prompts, or other reusable prompt mechanisms that users can invoke quickly.

**Value:** <!-- yes/no/partial/null -->

**Detail:** <!-- Optional: e.g., "Supports slash commands for common actions, e.g. `/explain`, `/test`" -->

**Note:** Examples include `/commit`, `/test`, `/review` type commands.

**Examples:**
- Aider: `{ "value": "no", "detail": "All instructions given via natural language chat" }`
- Claude Code: `{ "value": "yes", "detail": "Supports slash commands for common actions in the editor/CLI, e.g. `/explain`, `/test`" }`

---

### 10. Sub-agents Support

**Definition:** Whether the agent can spawn or delegate work to specialized sub-agents for different tasks (e.g., a planning agent, testing agent, exploration agent).

**Value:** <!-- yes/no/partial/null -->

**Detail:** <!-- Optional: e.g., "Can spawn autonomous sub-agents to handle subtasks" -->

**Examples:**
- Aider: `{ "value": "no", "detail": null }`
- Claude Code: `{ "value": "yes", "detail": "Can spawn autonomous sub-agents to handle subtasks" }`

---

### 11. Plan Mode

**Definition:** Whether the agent supports a dedicated planning mode for architectural planning, task breakdown, or implementation strategy before writing code.

**Value:** <!-- yes/no/partial/null -->

**Detail:** <!-- Optional: e.g., "Plan mode for architectural planning before implementation" -->

**Possible values:**
- `yes` - Has dedicated planning/architect mode
- `no` - No explicit planning mode
- `partial` - Limited planning capabilities

**Examples:**
- Aider: `{ "value": "no", "detail": null }`
- Claude Code: `{ "value": "yes", "detail": "Plan mode for architectural planning before implementation" }`
- Cursor: `{ "value": "yes", "detail": "Plan/Act modes for structured development" }`

---

### 12. Hooks

**Definition:** Whether the agent supports user-defined scripts or commands that execute at various points in the agent's lifecycle (before/after tool calls, file edits, shell commands, etc.).

**Value:** <!-- yes/no/partial/null -->

**Detail:** <!-- Optional: e.g., "Read more: https://example.com/docs/hooks" -->

**Possible values:**
- `yes` - Supports multiple hook events across different lifecycle points with both pre and post execution hooks
- `no` - Does not support user-defined hooks or lifecycle callbacks
- `partial` - Supports hooks but with limited events or restricted functionality

**Examples:**
- Aider: `{ "value": "no", "detail": null }`
- Claude Code: `{ "value": "yes", "detail": "Read more: https://code.claude.com/docs/en/hooks" }`
- Windsurf: `{ "value": "yes", "detail": "Read more: https://docs.windsurf.com/windsurf/cascade/hooks" }`

---

## Additional Information

### Additional Info* (required)

**Description:**
<!-- 1-2 sentences highlighting unique features or capabilities that distinguish this agent -->

A brief description highlighting unique features, special capabilities, or important details that distinguish this agent from others.

**Tips:**
- Keep it concise (1-2 sentences)
- Focus on differentiating features
- Mention unique terminology or special capabilities

**Examples:**
- Aider: `"Integrates with Git (auto-commits changes with messages); voice input and image context support"`
- Claude Code: `"Supports Hooks (automated event-driven scripts) and Plugins to extend with new capabilities"`

---

## Supporting Information

**Official Website or Documentation:**
<!-- Link to the agent's homepage or documentation -->

**Why should this agent be included?**
<!-- Brief explanation of why this agent is notable or different from existing agents -->

---

## Pre-submission Checklist

- [ ] I have filled in all required fields marked with (*): Name, Type, Website, First Release, Additional Info
- [ ] I have provided accurate values for all 12 features (yes/no/partial/null)
- [ ] I have reviewed the [Agent Properties Terminology](https://github.com/PackmindHub/coding-agents-matrix#agent-properties-terminology)
- [ ] I have provided examples and context in the "detail" fields where applicable
- [ ] The agent name in the issue title matches the agent name in the form
- [ ] I have set `ghStars` to `null` (it will be auto-updated)
- [ ] I have provided the official website URL in the Links section
- [ ] The `additionalInfo` field highlights what makes this agent unique
