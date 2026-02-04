import { Lightbulb } from 'lucide-react'

export default function ProTips({ tips }) {
  if (!tips || tips.length === 0) return null

  return (
    <div className="glossary-pro-tips">
      <h4 className="glossary-pro-tips-title">
        <Lightbulb className="w-4 h-4" />
        Pro Tips
      </h4>
      <ul className="glossary-pro-tips-list">
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  )
}
