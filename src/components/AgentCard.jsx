import ValueBadge from './ValueBadge'
import { Github, Star, ExternalLink } from 'lucide-react'

const AgentCard = ({ agent }) => {
  const isOpenSource = agent.type === 'Open Source'

  return (
    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-700/50 p-5 hover:shadow-2xl hover:shadow-violet-500/10 hover:border-slate-600/50 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-100 tracking-tight">{agent.name}</h3>
        <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium border backdrop-blur-sm ${
          isOpenSource
            ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
            : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
        }`}>
          {agent.type}
        </span>
      </div>

      {/* GitHub section for open source agents */}
      {agent.type === 'Open Source' && agent.github && (
        <div className="mb-4 pb-4 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <a
              href={agent.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-300 transition-colors duration-200 font-mono text-xs"
            >
              <Github className="w-3.5 h-3.5" />
              <span>{agent.github.match(/github\.com\/([^\/]+\/[^\/]+)/)?.[1]}</span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </a>

            {agent.ghStars && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-semibold">{agent.ghStars.toLocaleString('en-US')}</span>
              </span>
            )}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">CLI</span>
            <div className="mt-1.5">
              <ValueBadge value={agent.cli} detail={agent.cliDetail} />
            </div>
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Dedicated IDE</span>
            <div className="mt-1.5">
              <ValueBadge value={agent.dedicatedIde} detail={agent.dedicatedIdeDetail} />
            </div>
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">BYO LLM</span>
            <div className="mt-1.5">
              <ValueBadge value={agent.byoLlm} detail={agent.byoLlmDetail} />
            </div>
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">MCP</span>
            <div className="mt-1.5">
              <ValueBadge value={agent.mcpSupport} detail={agent.mcpSupportDetail} />
            </div>
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">AGENTS.md</span>
            <div className="mt-1.5">
              <ValueBadge value={agent.agentsMdSupport} detail={agent.agentsMdSupportDetail} />
            </div>
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Skills</span>
            <div className="mt-1.5">
              <ValueBadge value={agent.agentSkillsSupport} detail={agent.agentSkillsSupportDetail} />
            </div>
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Commands</span>
            <div className="mt-1.5">
              <ValueBadge value={agent.commandsReusablePrompts} detail={agent.commandsReusablePromptsDetail} />
            </div>
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Subagents</span>
            <div className="mt-1.5">
              <ValueBadge value={agent.subagentsSupport} detail={agent.subagentsSupportDetail} />
            </div>
          </div>
        </div>
      </div>

      {agent.additionalInfo && (
        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{agent.additionalInfo}</p>
        </div>
      )}
    </div>
  )
}

export default AgentCard
