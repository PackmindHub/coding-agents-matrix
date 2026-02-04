import { useState } from 'react'
import { ExternalLink } from 'lucide-react'

const AGENT_TABS = [
  { id: 'claude-code', name: 'Claude Code' },
  { id: 'github-copilot', name: 'GitHub Copilot' },
  { id: 'cursor', name: 'Cursor' }
]

export default function GlossaryCodeExample({
  exampleType = 'single',
  example,
  examples,
  exampleLink
}) {
  const [activeTab, setActiveTab] = useState('claude-code')

  // Single example mode (Skills, Plugins)
  if (exampleType === 'single' && example) {
    return (
      <div className="glossary-code-example">
        <div className="glossary-code-header">
          <span className="glossary-code-title">{example.title}</span>
          <span className="glossary-code-language">{example.language}</span>
        </div>
        <pre className="glossary-code-block">
          <code>{example.code}</code>
        </pre>
        {exampleLink && (
          <div className="glossary-code-link">
            <a
              href={exampleLink.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {exampleLink.text}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>
    )
  }

  // Tabbed mode (Commands, SubAgents, Hooks)
  if (exampleType === 'tabbed' && examples) {
    const activeExample = examples[activeTab]

    return (
      <div className="glossary-code-example">
        {/* Tab bar */}
        <div className="glossary-code-tabs">
          {AGENT_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`glossary-code-tab ${activeTab === tab.id ? 'glossary-code-tab-active' : ''}`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Code block */}
        {activeExample && (
          <>
            <div className="glossary-code-header">
              <span className="glossary-code-title">{activeExample.title}</span>
              <span className="glossary-code-language">{activeExample.language}</span>
            </div>
            <pre className="glossary-code-block">
              <code>{activeExample.code}</code>
            </pre>
            {activeExample.isUnsupported && (
              <div className="glossary-code-unsupported">
                This feature is not yet supported by {AGENT_TABS.find(t => t.id === activeTab)?.name}
              </div>
            )}
          </>
        )}
      </div>
    )
  }

  return null
}
