# Agents Board Schema Reference

## Files Overview

| File | Purpose |
|------|---------|
| `src/data/agents-detailed.json` | Main database of all agents with property values |
| `src/data/groups.json` | Column groupings for table display |
| `src/components/AgentTable.jsx` | Column definitions with labels and tooltips |
| `src/hooks/useAgentsData.js` | Data transformation from JSON to flat structure |
| `.github/ISSUE_TEMPLATE/01-update-agent.md` | GitHub issue template for updates |
| `.github/ISSUE_TEMPLATE/02-add-new-agent.md` | GitHub issue template for new agents |

## agents-detailed.json Structure

Each agent entry follows this structure:

```json
{
  "name": "Agent Name",
  "type": "Open Source",  // or "Proprietary"
  "propertyName": {
    "value": "yes",       // "yes" | "no" | "partial" | null
    "detail": "Optional context"
  },
  "additionalInfo": "Free-form description"
}
```

### Property Value Types

| Type | Valid Values | Used For |
|------|--------------|----------|
| `badge` | `"yes"`, `"no"`, `"partial"`, `null` | Feature properties |
| `text` | String or `null` | Dates, URLs |
| `stars` | Number or `null` | GitHub stars |

## groups.json Structure

```json
{
  "groups": [
    {
      "id": "groupId",
      "label": "Group Label",
      "columns": ["column1", "column2"]
    }
  ]
}
```

Current groups: `identity`, `packaging`, `features`

## AgentTable.jsx Column Definition

```javascript
{
  key: 'propertyKey',           // Matches JSON property name
  label: 'Display Label',       // Short header text
  sortable: true,               // Enable sorting
  cellType: 'badge',            // 'badge' | 'text' | 'stars' | 'nameLink' | 'type'
  tooltip: 'Description text'   // Hover tooltip
}
```

## useAgentsData.js Transformation

For each property, add two lines:
```javascript
propertyName: agent.propertyName.value,
propertyNameDetail: agent.propertyName.detail,
```
