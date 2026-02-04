import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import GlossaryCodeExample from './GlossaryCodeExample'

export default function GlossaryCard({
  id,
  term,
  fullName,
  icon: Icon,
  description,
  summary,
  example,
  examples,
  exampleType,
  exampleLink
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div id={id} className="glossary-card scroll-mt-24">
      <div className="glossary-card-icon">
        <Icon className="w-6 h-6 text-violet-400" />
      </div>
      <div className="glossary-card-content">
        <h2 className="glossary-card-title">
          <span className="text-violet-400">{term}</span>
          {fullName && (
            <span className="glossary-card-fullname"> — {fullName}</span>
          )}
        </h2>

        {/* Summary (always visible) */}
        <p className="glossary-card-summary">{summary || description}</p>

        {/* Expand button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="glossary-card-expand-btn"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? 'Show less' : 'Learn more'}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        {/* Expandable content */}
        <div className={`glossary-card-expandable ${isExpanded ? 'glossary-card-expanded' : ''}`}>
          <div className="glossary-card-expanded-content">
            {/* Full description */}
            <div className="glossary-card-description">
              {description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Code example */}
            {(example || examples) && (
              <GlossaryCodeExample
                exampleType={exampleType}
                example={example}
                examples={examples}
                exampleLink={exampleLink}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
