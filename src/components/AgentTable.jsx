import TableHeader from './TableHeader'
import TableRow from './TableRow'
import AgentCard from './AgentCard'
import groups from '../data/groups.json'
import { Star } from 'lucide-react'

const AgentTable = ({ agents, sortConfig, onSort }) => {
  // Build a set of column keys that are at group boundaries (last column of each group, except the last group)
  const groupBoundaries = new Set()
  const groupList = groups.groups
  for (let i = 0; i < groupList.length - 1; i++) {
    const lastCol = groupList[i].columns[groupList[i].columns.length - 1]
    groupBoundaries.add(lastCol)
  }

  const columns = [
    { key: 'name', label: 'Name', sortable: true, cellType: 'nameLink', tooltip: 'The name of the AI coding agent (click to visit website if available)' },
    { key: 'type', label: 'Open Source', sortable: true, cellType: 'openSource' },
    { key: 'ghStars', label: <><Star className="w-3.5 h-3.5 fill-amber-400 inline-block mr-1" />Stars</>, sortable: true, cellType: 'stars', tooltip: 'GitHub repository star count' },
    { key: 'firstRelease', label: '1st Release', sortable: true, cellType: 'text' },
    { key: 'cli', label: 'CLI', sortable: true, cellType: 'badge', tooltip: 'Command-line interface support for terminal-based usage of the AI Agent to read and edit files' },
    { key: 'dedicatedIde', label: 'Dedicated IDE', sortable: true, cellType: 'badge', tooltip: 'Has its own integrated development environment' },
    { key: 'ideExtension', label: 'IDE Extension', sortable: true, cellType: 'badge', tooltip: 'Available as an IDE extension/plugin' },
    { key: 'byoLlm', label: 'BYO LLM', sortable: true, cellType: 'badge', tooltip: 'Bring Your Own LLM - allows using custom language models, vs. using built-in list of LLM by the vendor' },
    { key: 'mcpSupport', label: 'MCP', sortable: true, cellType: 'badge', tooltip: 'Model Context Protocol support for enhanced context sharing' },
    { key: 'customRules', label: 'Custom Rules', sortable: true, cellType: 'badge', tooltip: 'Ability to define custom rules and guidelines for the agent' },
    { key: 'agentsMdSupport', label: 'AGENTS.md', sortable: true, cellType: 'badge', tooltip: 'Support for AGENTS.md configuration files' },
    { key: 'agentSkillsSupport', label: 'Skills', sortable: true, cellType: 'badge', tooltip: 'Support for custom skills and capabilities' },
    { key: 'commandsReusablePrompts', label: 'Commands', sortable: true, cellType: 'badge', tooltip: 'Reusable commands and prompts for common tasks' },
    { key: 'subagentsSupport', label: 'Subagents', sortable: true, cellType: 'badge', tooltip: 'Support for spawning specialized sub-agents for complex tasks' },
    { key: 'planMode', label: 'Plan Mode', sortable: true, cellType: 'badge', tooltip: 'Has a built-in plan mode before starting writing any line of code' }
  ].map(col => ({ ...col, isGroupBoundary: groupBoundaries.has(col.key) }))

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
          <TableHeader columns={columns} sortConfig={sortConfig} onSort={onSort} groups={groups.groups} />
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
