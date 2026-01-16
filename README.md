# AI Coding Agents Matrix

A beautiful, interactive comparison matrix of AI coding agents and their capabilities.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Adding a New Agent](#adding-a-new-agent)
- [Agent Properties Terminology](#agent-properties-terminology)
- [Property Values](#property-values)
- [Examples](#examples)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)

## Features

- **Interactive Table**: Sort by any column to compare agents
- **Advanced Filtering**: Search and filter by type, features, and capabilities
- **Beautiful Design**: Modern UI with smooth animations and hover effects
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Visual Badges**: Color-coded badges for easy capability identification

### Sorting

Click any column header to sort:
- First click: Ascending order
- Second click: Descending order
- Third click: Return to default order

### Filtering

- **Search**: Filter by agent name, type, or description
- **Type**: Filter by Open Source or Proprietary
- **Features**: Select multiple features (CLI, MCP Support, AGENTS.md, Skills, Subagents)

All filters use AND logic for precise results.

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see the application.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Adding a New Agent

To add a new agent to the board, follow these steps:

1. **Open the agents data file**: `/src/data/agents.json`

2. **Add a new agent object** to the array with all required properties:

```json
{
  "name": "Your Agent Name",
  "type": "Open Source",
  "ghStars": null,
  "cli": "yes",
  "dedicatedIde": "no",
  "byoLlm": "yes",
  "mcpSupport": "yes",
  "customRules": "yes",
  "agentsMdSupport": "yes",
  "agentSkillsSupport": "yes",
  "commandsReusablePrompts": "yes",
  "subagentsSupport": "no",
  "additionalInfo": "Brief description of unique features and capabilities"
}
```

3. **Save the file** - the UI will automatically pick up the new agent

4. **(Optional)** Update `/src/data/agents.yaml` if you want to maintain YAML format consistency

## Agent Properties Terminology

Each agent has the following properties:

### `name` (string, required)
The official name of the AI coding agent.

**Example:** `"Claude Code"`, `"Aider"`, `"Cursor"`

---

### `type` (string, required)
The licensing model of the agent.

**Possible values:**
- `"Open Source"` - Source code is publicly available and can be self-hosted
- `"Proprietary"` - Closed-source commercial product

**Example:** `"Open Source"` or `"Proprietary"`

---

### `github` (object, required)
The GitHub repository URL for the agent's source code.

**Structure:** `{ "value": "https://github.com/owner/repo" or null, "detail": null }`

**Example:** `{ "value": "https://github.com/Aider-AI/aider", "detail": null }`

---

### `ghStars` (object, optional)
The number of GitHub stars the repository has received.

**Structure:** `{ "value": 5000 or null, "detail": "Last updated: YYYY-MM-DD" }`

**Note:** Automatically populated by `npm run update-stars` script.

**Example:** `{ "value": 25430, "detail": "Last updated: 2026-01-16" }`

---

### `cli` (string, required)
Whether the agent provides a Command Line Interface for terminal-based interaction.

**Possible values:**
- `"yes"` - Full CLI support
- `"no"` - No CLI available
- `"partial"` - Limited CLI functionality (e.g., some features require GUI)

**Example:** `"yes"`

---

### `dedicatedIde` (string, required)
Whether the agent comes with or requires a dedicated Integrated Development Environment.

**Possible values:**
- `"yes"` - Has its own IDE or is an IDE extension that requires a specific IDE
- `"no"` - Works independently or integrates with any IDE/editor

**Example:** `"no"`

---

### `byoLlm` (string, required)
**"Bring Your Own LLM"** - Whether users can configure the agent to use their own choice of Language Model provider (OpenAI, Anthropic, local models, etc.).

**Possible values:**
- `"yes"` - Supports multiple LLM providers/models
- `"no"` - Locked to a specific provider
- `"partial"` - Limited choice or requires specific configuration

**Example:** `"yes"`

---

### `mcpSupport` (string, required)
**"Model Context Protocol"** support - Whether the agent implements MCP, an open standard for connecting AI assistants to external data sources and tools.

**Possible values:**
- `"yes"` - Supports MCP servers/connections
- `"no"` - Does not support MCP

**Example:** `"yes"`

**Learn more:** [Model Context Protocol](https://modelcontextprotocol.io/)

---

### `customRules` (string, required)
Whether the agent allows users to define custom instructions, guidelines, or rules that shape the agent's behavior.

**Possible values:**
- `"yes"` - Supports custom rules/instructions
- `"no"` - Fixed behavior without customization

**Example:** `"yes"`

---

### `agentsMdSupport` (string, required)
Whether the agent recognizes and uses `AGENTS.md` files for project-specific instructions and context.

**Possible values:**
- `"yes"` - Reads and follows AGENTS.md files
- `"no"` - Does not support AGENTS.md format

**Example:** `"yes"`

**Note:** AGENTS.md is an emerging convention for defining agent-specific instructions in a project.

---

### `agentSkillsSupport` (string, required)
Whether the agent supports installable skills, plugins, or extensions that add new capabilities or specialized behaviors.

**Possible values:**
- `"yes"` - Supports skills/plugins system
- `"no"` - No extensibility through skills

**Example:** `"yes"`

---

### `commandsReusablePrompts` (string, required)
Whether the agent supports slash commands, saved prompts, or other reusable prompt mechanisms that users can invoke quickly.

**Possible values:**
- `"yes"` - Supports reusable commands/prompts
- `"no"` - No command system

**Example:** `"yes"`

**Note:** Examples include `/commit`, `/test`, `/review` type commands.

---

### `subagentsSupport` (string, required)
Whether the agent can spawn or delegate work to specialized sub-agents for different tasks (e.g., a planning agent, testing agent, exploration agent).

**Possible values:**
- `"yes"` - Supports sub-agent architecture
- `"no"` - Single-agent system

**Example:** `"yes"`

---

### `additionalInfo` (string, required)
A brief description highlighting unique features, special capabilities, or important details that distinguish this agent from others.

**Example:** `"Supports Hooks (automated event-driven scripts) and Plugins to extend with new capabilities"`

**Tips:**
- Keep it concise (1-2 sentences)
- Focus on differentiating features
- Mention unique terminology (e.g., "Cursor Rules", "Hooks")

---

## Property Values

The UI renders different visual indicators based on property values:

| Value | Badge Color | Icon | Meaning |
|-------|-------------|------|---------|
| `"yes"` | Green | ✓ | Feature is fully supported |
| `"no"` | Red | ✗ | Feature is not available |
| `"partial"` or `"limited"` | Amber | ◯ | Feature is partially supported or has limitations |
| `null` | Gray | — | Not applicable or not yet determined |

## Examples

### Example 1: Open Source Agent with Full CLI

```json
{
  "name": "Aider",
  "type": "Open Source",
  "ghStars": null,
  "cli": "yes",
  "dedicatedIde": "no",
  "byoLlm": "yes",
  "mcpSupport": "no",
  "customRules": "yes",
  "agentsMdSupport": "yes",
  "agentSkillsSupport": "no",
  "commandsReusablePrompts": "yes",
  "subagentsSupport": "no",
  "additionalInfo": "Git-aware CLI tool; supports architect mode for planning; voice coding support"
}
```

### Example 2: Proprietary Agent with IDE and Subagents

```json
{
  "name": "Claude Code",
  "type": "Proprietary",
  "ghStars": null,
  "cli": "yes",
  "dedicatedIde": "no",
  "byoLlm": "no",
  "mcpSupport": "yes",
  "customRules": "yes",
  "agentsMdSupport": "no",
  "agentSkillsSupport": "yes",
  "commandsReusablePrompts": "yes",
  "subagentsSupport": "yes",
  "additionalInfo": "Supports Hooks (automated event-driven scripts) and Plugins to extend with new capabilities"
}
```

### Example 3: Agent with Partial CLI Support

```json
{
  "name": "Cursor",
  "type": "Proprietary",
  "ghStars": null,
  "cli": "partial",
  "dedicatedIde": "yes",
  "byoLlm": "no",
  "mcpSupport": "yes",
  "customRules": "yes",
  "agentsMdSupport": "yes",
  "agentSkillsSupport": "yes",
  "commandsReusablePrompts": "yes",
  "subagentsSupport": "no",
  "additionalInfo": "VS Code fork IDE; supports background agents for suggestions; Cursor Rules for instructions"
}
```

## Updating GitHub Stars

To update star counts for open source agents:

```bash
npm run update-stars
```

This script:
- Fetches current star counts from GitHub API (unauthenticated, 60 req/hour)
- Updates the `agents-detailed.json` file
- Creates a backup in `/backups/` before modifying data
- Handles errors gracefully (404s, rate limits, network issues)

Run this script weekly or after adding new agents.

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Lightning-fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Beautiful, consistent icons

## Project Structure

```
agents-board/
├── src/
│   ├── components/
│   │   ├── AgentTable.jsx      # Main table component
│   │   ├── AgentCard.jsx       # Mobile card view
│   │   ├── FilterBar.jsx       # Search and filter UI
│   │   ├── TableCell.jsx       # Table cell renderer
│   │   ├── TableHeader.jsx     # Sortable column headers
│   │   ├── TableRow.jsx        # Agent row component
│   │   └── ValueBadge.jsx      # Yes/No/Partial badges
│   ├── data/
│   │   ├── agents.json         # Main agent data source
│   │   └── agents.yaml         # Alternative YAML format
│   ├── hooks/
│   │   ├── useAgentsData.js    # Data loading hook
│   │   ├── useFiltering.js     # Filter logic hook
│   │   └── useSorting.js       # Sort logic hook
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

### Component Hierarchy

```
App
├── FilterBar (handles search, type filter, feature toggles)
├── AgentTable
│   ├── AgentCard (mobile view)
│   ├── TableHeader (sortable columns)
│   └── TableRow
│       └── TableCell
│           └── ValueBadge
└── useAgentsData (loads agents.json)
    ├── useFiltering (search + type + feature filters)
    └── useSorting (multi-value aware sorting)
```

## Data Source

The agent data is compiled from official documentation, GitHub repositories, and public sources. Last updated: January 2026.

## Contributing

When adding new agents:
1. Ensure all required properties are present
2. Use consistent terminology and values
3. Keep `additionalInfo` concise and informative
4. Verify the agent renders correctly in both table and card views
5. Test filtering and sorting with the new agent included

## License

MIT
