import ValueBadge from './ValueBadge'
import { Github, ExternalLink } from 'lucide-react'

const AgentCard = ({ agent }) => {
  const isOpenSource = agent.type === 'Open Source'
  const openSourceValue = isOpenSource ? 'Yes' : 'No'

  // Extract domain from website URL
  const getWebsiteDomain = (url) => {
    if (!url) return null
    try {
      return new URL(url).hostname.replace('www.', '')
    } catch {
      return url
    }
  }

  return (
    <div className="glass-container p-5">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-100 tracking-tight">{agent.name}</h3>
        <div>
          <span className="section-label block text-right mb-1">Open Source</span>
          <ValueBadge value={openSourceValue} />
        </div>
      </div>

      {/* GitHub and Website section */}
      <div className="mb-4 pb-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between flex-wrap gap-2">
          {agent.github ? (
            <a
              href={agent.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-brand-mono"
            >
              <Github className="w-3.5 h-3.5" />
              <span>{agent.github.match(/github\.com\/([^/]+\/[^/]+)/)?.[1]}</span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
          ) : agent.website ? (
            <a
              href={agent.website}
              target="_blank"
              rel="noopener noreferrer"
              className="link-brand"
            >
              <span>{getWebsiteDomain(agent.website)}</span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
          ) : (
            <span className="text-slate-600 text-xs">—</span>
          )}

          <div className="flex items-center gap-2">
            {agent.ghStars && (
              <span className="badge-stars">
                <span className="font-semibold">{agent.ghStars.toLocaleString('en-US')} stars</span>
              </span>
            )}
            {agent.firstRelease && (
              <span className="text-slate-400 text-xs">
                Since {agent.firstRelease}
              </span>
            )}
          </div>
        </div>

        {/* Show website separately if we have both github and website */}
        {agent.github && agent.website && (
          <div className="mt-2">
            <a
              href={agent.website}
              target="_blank"
              rel="noopener noreferrer"
              className="link-brand"
            >
              <span>{getWebsiteDomain(agent.website)}</span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="section-label">CLI</span>
            <div className="mt-1.5">
              <ValueBadge value={agent.cli} detail={agent.cliDetail} />
            </div>
          </div>
          <div>
            <span className="section-label">Dedicated IDE</span>
            <div className="mt-1.5">
              <ValueBadge value={agent.dedicatedIde} detail={agent.dedicatedIdeDetail} />
            </div>
          </div>
          <div>
            <span className="section-label">BYO LLM</span>
            <div className="mt-1.5">
              <ValueBadge value={agent.byoLlm} detail={agent.byoLlmDetail} />
            </div>
          </div>
          <div>
            <span className="section-label">MCP</span>
            <div className="mt-1.5">
              <ValueBadge value={agent.mcpSupport} detail={agent.mcpSupportDetail} />
            </div>
          </div>
          <div>
            <span className="section-label">AGENTS.md</span>
            <div className="mt-1.5">
              <ValueBadge value={agent.agentsMdSupport} detail={agent.agentsMdSupportDetail} />
            </div>
          </div>
          <div>
            <span className="section-label">Skills</span>
            <div className="mt-1.5">
              <ValueBadge value={agent.agentSkillsSupport} detail={agent.agentSkillsSupportDetail} />
            </div>
          </div>
          <div>
            <span className="section-label">Commands</span>
            <div className="mt-1.5">
              <ValueBadge value={agent.commandsReusablePrompts} detail={agent.commandsReusablePromptsDetail} />
            </div>
          </div>
          <div>
            <span className="section-label">Subagents</span>
            <div className="mt-1.5">
              <ValueBadge value={agent.subagentsSupport} detail={agent.subagentsSupportDetail} />
            </div>
          </div>
          <div>
            <span className="section-label">Plan Mode</span>
            <div className="mt-1.5">
              <ValueBadge value={agent.planMode} detail={agent.planModeDetail} />
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
