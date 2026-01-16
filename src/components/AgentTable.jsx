import TableHeader from './TableHeader'
import TableRow from './TableRow'
import AgentCard from './AgentCard'

const AgentTable = ({ agents, sortConfig, onSort }) => {
  const columns = [
    { key: 'name', label: 'Name', sortable: true, cellType: 'text', tooltip: 'The name of the AI coding agent' },
    { key: 'type', label: 'Type', sortable: true, cellType: 'type', tooltip: 'Whether the agent is open source or proprietary' },
    { key: 'github', label: 'GitHub', sortable: false, cellType: 'github', tooltip: 'Source code repository (open source agents only)' },
    { key: 'ghStars', label: 'Stars', sortable: true, cellType: 'stars', tooltip: 'GitHub repository star count' },
    { key: 'cli', label: 'CLI', sortable: true, cellType: 'badge', tooltip: 'Command-line interface support for terminal-based usage' },
    { key: 'dedicatedIde', label: 'Dedicated IDE', sortable: true, cellType: 'badge', tooltip: 'Has its own integrated development environment' },
    { key: 'byoLlm', label: 'BYO LLM', sortable: true, cellType: 'badge', tooltip: 'Bring Your Own LLM - allows using custom language models' },
    { key: 'mcpSupport', label: 'MCP', sortable: true, cellType: 'badge', tooltip: 'Model Context Protocol support for enhanced context sharing' },
    { key: 'customRules', label: 'Custom Rules', sortable: true, cellType: 'badge', tooltip: 'Ability to define custom rules and guidelines for the agent' },
    { key: 'agentsMdSupport', label: 'AGENTS.md', sortable: true, cellType: 'badge', tooltip: 'Support for AGENTS.md configuration files' },
    { key: 'agentSkillsSupport', label: 'Skills', sortable: true, cellType: 'badge', tooltip: 'Support for custom skills and capabilities' },
    { key: 'commandsReusablePrompts', label: 'Commands', sortable: true, cellType: 'badge', tooltip: 'Reusable commands and prompts for common tasks' },
    { key: 'subagentsSupport', label: 'Subagents', sortable: true, cellType: 'badge', tooltip: 'Support for spawning specialized sub-agents for complex tasks' }
  ]

  if (agents.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 text-lg font-light">No agents found matching your filters.</p>
        <p className="text-slate-500 text-sm mt-2">Try adjusting your search or filter criteria.</p>
      </div>
    )
  }

  return (
    <>
      {/* Mobile Card Layout */}
      <div className="block md:hidden space-y-4">
        {agents.map((agent) => (
          <AgentCard key={agent.name} agent={agent} />
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-700/50 shadow-2xl backdrop-blur-xl bg-slate-900/30">
        <table className="w-max divide-y divide-slate-800/50">
          <TableHeader columns={columns} sortConfig={sortConfig} onSort={onSort} />
          <tbody className="divide-y divide-slate-800/50">
            {agents.map((agent) => (
              <TableRow key={agent.name} agent={agent} columns={columns} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AgentTable
