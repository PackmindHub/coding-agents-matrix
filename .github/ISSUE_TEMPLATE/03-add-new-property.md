---
name: Add New Property
about: Propose a new property/feature to track across all agents
title: "[PROPERTY] Property Name"
labels: "new-property, needs-review"
---

# Add New Property

Thank you for helping expand the coding-agents-matrix! Use this template to propose a new property or feature that should be tracked across all agents.

**Before submitting:**
- Review the [Agent Properties Terminology](https://github.com/PackmindHub/coding-agents-matrix#agent-properties-terminology) in the README
- Check existing properties to avoid duplication
- Properties must be trackable across all agents (not agent-specific)

---

## Property Details

### Property Name* (required)

**Technical Name (camelCase):**
<!-- e.g., mcpSupport, customRules, dedicatedIde -->

This should follow camelCase convention and be concise.

### Display Name* (required)

**Human-Readable Name:**
<!-- How should this appear in the comparison table header? e.g., "MCP Support", "Custom Rules" -->

---

## Property Group* (required)

Select which group this property belongs to:

- [ ] **Identity** - Core identifying information about the agent
  - Examples: name, type, website, github, ghStars, firstRelease
  - Use this for: fundamental agent characteristics

- [ ] **Packaging** - How the agent is distributed and accessed
  - Examples: cli, dedicatedIde, ideExtension
  - Use this for: deployment and access methods

- [ ] **Features** - Capabilities and supported features
  - Examples: byoLlm, mcpSupport, customRules, planMode
  - Use this for: functional capabilities

---

## Property Description

### What does this property represent?* (required)

**Clear Explanation (2-3 sentences):**
<!-- Describe what this property tracks and why it's distinct from existing properties -->

### Motivation* (required)

**Why is this property valuable?**
<!-- Explain why users comparing agents need this information -->

---

## Expected Values* (required)

### Value Format

How should this property be valued? Select one:

- [ ] **Yes/No/Partial/Null** (most common for features)
  - `yes` - Property is fully supported
  - `no` - Property is not supported
  - `partial` - Property is partially supported or requires specific conditions
  - `null` - Information not available or not applicable

- [ ] **Custom Values** (if yes/no/partial/null doesn't fit)
  - Specify the allowed values:
  <!-- e.g., "Low", "Medium", "High" or "Beta", "Stable", "Deprecated" -->

### Value Guidelines

For each value, describe when it should be used:

<!-- Example for yes/no/partial:
- `yes`: Agent fully supports this feature with no limitations
- `no`: Agent does not support this feature at all
- `partial`: Agent supports the feature but with limitations (describe in detail field)
- `null`: Information not verified or not applicable to this agent
-->

---

## Examples of Agents Supporting This Feature* (required)

List at least 2-3 agents that support or demonstrate this property:

- **Agent Name 1**: <!-- Optional detail about implementation -->
- **Agent Name 2**: <!-- Optional detail about implementation -->
- **Agent Name 3**: <!-- Optional detail about implementation -->

---
