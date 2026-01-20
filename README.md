# AI Coding Agents Matrix

A beautiful, interactive comparison matrix of AI coding agents and their capabilities.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Adding a New Agent](#adding-a-new-agent)
- [Agent Properties Reference](#agent-properties-reference)
- [Property Values](#property-values)
- [Examples](#examples)
- [Contribute](#contribute)

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

1. **Open the agents data file**: `/src/data/agents-detailed.json`

2. **Add a new agent object** to the array with all required properties:

```json
{
  "name": "Your Agent Name",
  "type": "Open Source",
  "github": { "value": "https://github.com/owner/repo", "detail": null },
  "ghStars": { "value": null, "detail": null },
  "website": { "value": "https://youragent.com", "detail": null },
  "firstRelease": { "value": "2025-01", "detail": null },
  "cli": { "value": "yes", "detail": null },
  "dedicatedIde": { "value": "no", "detail": null },
  "ideExtension": { "value": "no", "detail": null },
  "byoLlm": { "value": "yes", "detail": "Supports OpenAI and Anthropic" },
  "mcpSupport": { "value": "yes", "detail": null },
  "customRules": { "value": "yes", "detail": null },
  "agentsMdSupport": { "value": "yes", "detail": null },
  "agentSkillsSupport": { "value": "yes", "detail": null },
  "commandsReusablePrompts": { "value": "yes", "detail": null },
  "subagentsSupport": { "value": "no", "detail": null },
  "planMode": { "value": "yes", "detail": null },
  "additionalInfo": "Brief description of unique features"
}
```

**Note about the `detail` field:**
- Use it to provide additional context that will appear as a tooltip in the UI
- Set to `null` when no clarification is needed
- Examples: links to documentation, clarifications about partial support, or caveats

3. **Save the file** - the UI will automatically pick up the new agent

4. **(Optional)** Update `/src/data/agents.yaml` if you want to maintain YAML format consistency

## Agent Properties Reference

### Data Structure

All properties except `name`, `type`, and `additionalInfo` use this structure:
```json
{
  "propertyName": {
    "value": "yes" | "no" | "partial" | string | number | null,
    "detail": "Optional context displayed as tooltip in UI"
  }
}
```

### Property Reference

| Property | Type | Values | Description |
|----------|------|--------|-------------|
| **Identity** | | | |
| `name` | string | - | Official agent name |
| `type` | string | `"Open Source"` \| `"Proprietary"` | Licensing model |
| `github` | object | `{value: "url" \| null, detail: null}` | GitHub repository URL |
| `ghStars` | object | `{value: number \| null, detail: "Last updated: date"}` | Star count (auto-updated) |
| `website` | object | `{value: "url" \| null, detail: null}` | Official website URL |
| `firstRelease` | object | `{value: "YYYY-MM" \| null, detail: null}` | Initial release date |
| **Packaging** | | | |
| `cli` | object | `{value: "yes" \| "no" \| "partial", detail: string \| null}` | CLI support |
| `dedicatedIde` | object | `{value: "yes" \| "no", detail: string \| null}` | Standalone/specific IDE |
| `ideExtension` | object | `{value: "yes" \| "no", detail: string \| null}` | Available as extension |
| **Features** | | | |
| `byoLlm` | object | `{value: "yes" \| "no" \| "partial", detail: string \| null}` | Bring Your Own LLM |
| `mcpSupport` | object | `{value: "yes" \| "no", detail: string \| null}` | [Model Context Protocol](https://modelcontextprotocol.io/) |
| `customRules` | object | `{value: "yes" \| "no", detail: string \| null}` | Custom instructions |
| `agentsMdSupport` | object | `{value: "yes" \| "no" \| "partial", detail: string \| null}` | AGENTS.md file support |
| `agentSkillsSupport` | object | `{value: "yes" \| "no", detail: string \| null}` | Skills/plugins system |
| `commandsReusablePrompts` | object | `{value: "yes" \| "no", detail: string \| null}` | Slash commands |
| `subagentsSupport` | object | `{value: "yes" \| "no" \| "partial", detail: string \| null}` | Sub-agent spawning |
| `planMode` | object | `{value: "yes" \| "no", detail: string \| null}` | Planning before execution |
| `additionalInfo` | string | - | Brief unique features |

### Detail Field Usage

The `detail` field provides context shown as tooltips:
- **Clarification**: "Terminal agent and VS Code plugin available"
- **Links**: Documentation URLs for features
- **Caveats**: "Not native, but can be configured..."
- **Null**: When no additional context needed

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

### Example 1: Complete Entry (Open Source Agent)

This example shows a complete agent entry using real data from Aider, demonstrating all properties with the correct `{value, detail}` structure:

```json
{
  "name": "Aider",
  "type": "Open Source",
  "github": {
    "value": "https://github.com/Aider-AI/aider",
    "detail": null
  },
  "ghStars": {
    "value": 39874,
    "detail": "Last updated: 2026-01-19"
  },
  "website": {
    "value": "https://aider.chat/",
    "detail": null
  },
  "firstRelease": {
    "value": "2023-06",
    "detail": null
  },
  "cli": {
    "value": "yes",
    "detail": null
  },
  "dedicatedIde": {
    "value": "no",
    "detail": null
  },
  "ideExtension": {
    "value": "no",
    "detail": null
  },
  "byoLlm": {
    "value": "yes",
    "detail": "Supports connecting to OpenAI, Anthropic or local models via API keys"
  },
  "mcpSupport": {
    "value": "no",
    "detail": "No built-in MCP client; can be extended via external MCP server integrations"
  },
  "customRules": {
    "value": "yes",
    "detail": "Through the usage of the file `CONVENTIONS.md`"
  },
  "agentsMdSupport": {
    "value": "partial",
    "detail": "Not native, but can be configured to read these files. Read more: https://aider.chat/docs/usage/conventions.html#always-load-conventions"
  },
  "agentSkillsSupport": {
    "value": "no",
    "detail": null
  },
  "commandsReusablePrompts": {
    "value": "no",
    "detail": "All instructions given via natural language chat"
  },
  "subagentsSupport": {
    "value": "no",
    "detail": null
  },
  "planMode": {
    "value": "no",
    "detail": "Has a `/architect` mode but not considered as a `plan` mode."
  },
  "additionalInfo": "Integrates with Git (auto-commits changes with messages); voice input and image context support"
}
```

### Example 2: Minimal Entry (Proprietary Agent)

This example shows a minimal entry for a proprietary agent without a GitHub repository:

```json
{
  "name": "Jules",
  "type": "Proprietary",
  "github": {
    "value": null,
    "detail": null
  },
  "ghStars": {
    "value": null,
    "detail": null
  },
  "website": {
    "value": "https://jules.google",
    "detail": null
  },
  "firstRelease": {
    "value": "2024-12",
    "detail": null
  },
  "cli": {
    "value": "yes",
    "detail": "Jules Tools CLI to interface with the cloud agent"
  },
  "dedicatedIde": {
    "value": "no",
    "detail": "Runs asynchronously in cloud; not inside your editor"
  },
  "ideExtension": {
    "value": "no",
    "detail": null
  },
  "byoLlm": {
    "value": "no",
    "detail": "Powered by Google's models on their backend"
  },
  "mcpSupport": {
    "value": "yes",
    "detail": "Jules uses tools in a sandboxed cloud environment to compile, test, etc., though not user-configurable MCP"
  },
  "customRules": {
    "value": "no",
    "detail": "No support for AGENTS.md or custom instructions files; agent infers context from repository code and standard config"
  },
  "agentsMdSupport": {
    "value": "no",
    "detail": null
  },
  "agentSkillsSupport": {
    "value": "no",
    "detail": null
  },
  "commandsReusablePrompts": {
    "value": "yes",
    "detail": "Tasks are queued via CLI commands or GitHub comments – e.g. you instruct Jules to fix tests and it works asynchronously"
  },
  "subagentsSupport": {
    "value": "no",
    "detail": "Jules itself is a single agent per task, operating asynchronously"
  },
  "planMode": {
    "value": "yes",
    "detail": "Creates execution plans before implementation"
  },
  "additionalInfo": "Works via GitHub integration; operates asynchronously in secure cloud sandbox"
}
```

## Contribute

We welcome contributions! Here are three ways you can help improve the coding-agents-matrix:

### 1. Add a New Agent

Use the **[Add New Agent](https://github.com/PackmindHub/coding-agents-matrix/issues/new?template=02-add-new-agent.md)** issue template to submit a new AI coding agent for inclusion in the comparison matrix.

**When to use:** You've discovered a new coding agent that should be tracked and compared with others.

**What you'll provide:**
- Agent name, type (Open Source/Proprietary), and website
- GitHub URL and first release date
- Support status for 11+ features (yes/no/partial/null)
- Brief description highlighting unique capabilities

### 2. Update an Existing Agent

Use the **[Update Existing Agent](https://github.com/PackmindHub/coding-agents-matrix/issues/new?template=01-update-agent.md)** issue template to propose updates to any agent's information.

**When to use:** An agent's properties have changed, new features are available, or information is outdated or incorrect.

**What you'll provide:**
- Agent name and brief description of changes
- Updated property values with supporting evidence
- Links to documentation or references

### 3. Propose a New Property

Use the **[Add New Property](https://github.com/PackmindHub/coding-agents-matrix/issues/new?template=03-add-new-property.md)** issue template to propose a new property or feature to track across all agents.

**When to use:** You think an important capability or characteristic should be added to the comparison matrix for all agents.

**What you'll provide:**
- Property name (technical name in camelCase)
- Property group (Identity/Packaging/Features)
- Clear description and motivation
- Examples of agents that support this property
- Value format (yes/no/partial/null or custom values)

### Tips for Contributing

- Review the [Agent Properties Terminology](#agent-properties-reference) section to understand the existing properties
- Check existing properties to avoid duplication
- Provide sources or references to support your changes
- Use clear, concise language in descriptions
- Verify your proposed values against official agent documentation

---

## Updating GitHub Stars

The following script:

```bash
npm run update-stars
```

is run weekly and updates automatically the values in the database file.

## Data Source

The agent data is compiled from official documentation, GitHub repositories, and public sources. Last updated: January 2026.

## Verification Checklist

After your contribution is accepted and merged:
1. Verify all required properties are present and correct
2. Use consistent terminology and values with existing agents
3. Keep `additionalInfo` concise and informative
4. Confirm the agent/property renders correctly in both table and card views
5. Test filtering and sorting with the new agent/property included

## License

MIT
