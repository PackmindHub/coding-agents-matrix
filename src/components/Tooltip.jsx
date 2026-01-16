import { useState } from 'react'
import { Info } from 'lucide-react'

const Tooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false)

  if (!content) return children

  return (
    <div className="relative inline-flex group">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help flex items-center"
      >
        {children}
        <Info className="inline-block ml-1.5 w-3 h-3 text-slate-500 hover:text-violet-400 group-hover:text-violet-400 transition-colors duration-200" />
      </div>
      {isVisible && (
        <div className="absolute z-[100] top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl text-xs text-slate-200 leading-relaxed pointer-events-none whitespace-normal break-words">
          <div className="relative">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-800 border-t border-l border-slate-600 rotate-45"></div>
            {content}
          </div>
        </div>
      )}
    </div>
  )
}

export default Tooltip
