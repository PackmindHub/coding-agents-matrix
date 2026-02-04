import { BookMarked, Terminal, Users, Zap, Package } from 'lucide-react'

export const glossaryTerms = [
  {
    id: 'skills',
    term: 'Skills',
    fullName: 'Specialized Knowledge Directories',
    icon: BookMarked,
    description: 'Skills are markdown files (SKILL.md) with YAML frontmatter that give agents domain-specific expertise. Skills load automatically when contextually relevant—the agent detects when to activate them based on the current task. Key features include argument passing via $ARGUMENTS, tool restrictions to limit what the skill can do, and dynamic context injection using !`command` syntax.\n\nSkills can be user-invocable (triggered manually with /skill-name) or model-invocable (the agent decides when to use them). The description field in frontmatter helps the agent understand when activation is appropriate. The disable-model-invocation option restricts skills to manual triggering only.',
    summary: 'Folders of instructions and resources that agents discover and use to perform specialized tasks more accurately.',
    quizQuestion: 'Markdown directories with instructions that agents automatically discover and activate based on task context.',
    exampleType: 'single',
    exampleLink: { text: 'Agent Skills Specification', url: 'https://agentskills.io/home' },
    example: {
      title: 'SKILL.md Definition',
      language: 'yaml',
      code: `---
name: code-review
description: Review code for quality and best practices
allowed-tools: Read, Grep, Glob
---

When reviewing code, check for:
1. Security vulnerabilities
2. Performance issues
3. Code style violations`
    }
  },
  {
    id: 'commands',
    term: 'Commands',
    fullName: 'Slash Commands',
    icon: Terminal,
    description: 'Commands are reusable prompt templates stored as Markdown files that automate common workflows across AI coding assistants. Commands are triggered by typing a slash prefix (/) followed by the command name in the chat interface. Most tools support both project-specific commands (stored in the project directory) and global/personal commands (stored in the user\'s home directory).\n\nAdvanced features vary by tool but commonly include: argument passing (text typed after the command name), YAML frontmatter for metadata like descriptions and tool restrictions, and dynamic context injection to capture live system state before execution. Some tools also support team-shared commands for enterprise collaboration.',
    summary: 'Reusable Markdown prompts triggered with /slash syntax that automate common workflows across AI coding tools.',
    quizQuestion: 'User-triggered prompts stored as Markdown files that execute workflows when invoked with a slash prefix.',
    exampleType: 'tabbed',
    examples: {
      'claude-code': {
        agentName: 'Claude Code',
        title: '.claude/commands/commit.md',
        language: 'markdown',
        code: `---
allowed-tools: Bash(git *)
argument-hint: [message]
description: Create a git commit
---

## Context
- Git status: !\`git status\`
- Git diff: !\`git diff HEAD\`

Create a commit with message: $ARGUMENTS`
      },
      'github-copilot': {
        agentName: 'GitHub Copilot',
        title: '.github/prompts/commit.prompt.md',
        language: 'markdown',
        code: `---
mode: agent
description: Create a git commit with proper message
tools: ['terminal']
---

Look at the staged changes and create a commit
with a descriptive message following conventional
commits format.`
      },
      'cursor': {
        agentName: 'Cursor',
        title: '.cursor/rules/commit.mdc',
        language: 'markdown',
        code: `---
description: Create git commits
globs: ["**/*"]
alwaysApply: false
---

When creating commits:
1. Review staged changes
2. Write a conventional commit message
3. Include scope and description`
      }
    }
  },
  {
    id: 'subagents',
    term: 'Subagents',
    fullName: 'Parallel Agent Sessions',
    icon: Users,
    description: 'Subagents are specialized AI assistants that operate with their own context window, custom system prompt, and specific tool access. Subagents handle specialized subtasks independently without consuming the main conversation context. They can run in foreground (blocking until complete) or background (working independently) modes.\n\nMost AI coding tools provide built-in subagents for common tasks like code exploration, command execution, and browser automation. Users can also create custom subagents tailored to specific workflows. Benefits include context isolation for long-running tasks, parallel execution of multiple specialists, and cost efficiency through model routing.',
    summary: 'Parallel AI assistants that handle specialized subtasks independently without consuming main conversation context.',
    quizQuestion: 'Independent AI sessions that run specialized tasks in parallel with isolated context windows.',
    exampleType: 'tabbed',
    examples: {
      'claude-code': {
        agentName: 'Claude Code',
        title: '.claude/agents/reviewer.md',
        language: 'markdown',
        code: `---
name: code-reviewer
description: Review code for quality and best practices
tools: Read, Glob, Grep
model: sonnet
---

When reviewing code, analyze:
1. Code quality and maintainability
2. Potential bugs or edge cases
3. Performance considerations
4. Security vulnerabilities`
      },
      'github-copilot': {
        agentName: 'GitHub Copilot',
        title: '.github/agents/reviewer.agent.md',
        language: 'markdown',
        code: `---
name: code-reviewer
description: Reviews code for quality issues
tools:
  - codeSearch
  - readFile
handoffs:
  - security-expert
---

Analyze code for quality, bugs, and
maintainability issues. Hand off security
concerns to the security-expert agent.`
      },
      'cursor': {
        agentName: 'Cursor',
        title: '.cursor/agents/reviewer.md',
        language: 'markdown',
        code: `---
name: security-auditor
description: Security specialist. Use when implementing auth, payments, or handling sensitive data.
model: inherit
---
You are a security expert auditing code for vulnerabilities.
When invoked:
1. Identify security-sensitive code paths
2. Check for common vulnerabilities (injection, XSS, auth bypass)
3. Verify secrets are not hardcoded
4. Review input validation and sanitization
Report findings by severity:
- Critical (must fix before deploy)
- High (fix soon)
- Medium (address when possible)`
      }
    }
  },
  {
    id: 'hooks',
    term: 'Hooks',
    fullName: 'Lifecycle Event Scripts',
    icon: Zap,
    description: 'Hooks are shell commands or scripts that execute at specific lifecycle points in an agent\'s workflow, providing deterministic control over agent behavior. Common lifecycle events include:\n- Pre/Post tool execution (before/after a tool runs)\n- Session start/end\n- Shell command execution\n- File operations (read/write)\n- Notifications (when agent needs attention)\n\nHooks typically use exit codes or JSON responses to control flow: success allows the operation to proceed, while specific codes (like exit 2) block the operation and can send feedback to the agent. Matchers or filters target specific tools or operations. This enables quality gates, automatic code formatting, security scanning, and safety guardrails across different AI coding agents.',
    summary: 'Automated scripts that run at key lifecycle moments to enforce quality gates, format code, scan for security issues, or send notifications.',
    quizQuestion: 'Event-triggered scripts that execute during specific lifecycle moments like file edits or tool execution.',
    exampleType: 'tabbed',
    examples: {
      'claude-code': {
        agentName: 'Claude Code',
        title: '.claude/settings.json',
        language: 'json',
        code: `{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "prettier --write $CLAUDE_FILE_PATH"
      }]
    }],
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "./scripts/approve-command.sh"
      }]
    }]
  }
}`
      },
      'github-copilot': {
        agentName: 'GitHub Copilot',
        title: '.github/hooks/hooks.json',
        language: 'json',
        code: `{
  "version": 1,
  "hooks": {
    "sessionStart": [{
      "command": "./hooks/init.sh"
    }],
    "afterFileEdit": [{
      "command": "./hooks/format.sh",
      "pattern": "*.ts"
    }],
    "beforeShellExecution": [{
      "command": "./hooks/approve.sh"
    }]
  }
}`
      },
      'cursor': {
        agentName: 'Cursor',
        title: '.cursor/hooks.json',
        language: 'json',
        code: `{
  "version": 1,
  "hooks": {
    "afterFileEdit": [{
      "command": "./hooks/format.sh"
    }],
    "preToolUse": [{
      "command": "./hooks/approve.sh",
      "matcher": "Edit|Write"
    }],
    "beforeShellExecution": [{
      "command": "./hooks/validate-cmd.sh"
    }]
  }
}`
      }
    }
  },
  {
    id: 'plugins',
    term: 'Plugins',
    fullName: 'Packaged Workflow Collections',
    icon: Package,
    description: 'Plugins are packages that bundle slash commands, specialised agents, MCP servers, and hooks into single installable units. A plugin\'s manifest lives at .claude-plugin/plugin.json. Skills within plugins are namespaced using the format /plugin-name:skill-name to avoid naming conflicts.\n\nPlugins can be distributed via marketplaces for broad adoption or loaded locally for development and testing. They enable teams to capture organizational knowledge and workflows in portable, version-controlled packages that work consistently across different projects and environments.',
    summary: 'Bundled collections of skills, agents, and hooks that can be shared across projects and teams.',
    quizQuestion: 'Shareable packages that bundle slash commands, specialised agents, MCP servers, and hooks into single installable units.',
    exampleType: 'single',
    example: {
      title: 'Plugin Directory Structure',
      language: 'bash',
      code: `my-plugin/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   └── code-review/
│       └── SKILL.md
├── agents/
│   └── reviewer.md
├── hooks/
│   └── hooks.json
└── .mcp.json`
    }
  }
]
