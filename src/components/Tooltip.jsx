import { useState, useRef, useEffect } from 'react'
import { Info } from 'lucide-react'

const Tooltip = ({ content, children, position = 'left' }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showAbove, setShowAbove] = useState(false)
  const hideTimeoutRef = useRef(null)
  const containerRef = useRef(null)

  if (!content) return children

  const positionClasses = {
    left: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-0'
  }

  const arrowClasses = {
    left: 'left-4',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-4'
  }

  const showTooltip = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }

    // Check if tooltip should appear above
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      // Show above if less than 150px below (enough for tooltip height)
      setShowAbove(spaceBelow < 150)
    }

    setIsVisible(true)
  }

  const hideTooltip = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false)
    }, 100)
  }

  const verticalPosition = showAbove ? 'bottom-full mb-2' : 'top-full mt-2'
  const arrowPosition = showAbove
    ? 'absolute -bottom-2 w-2 h-2 bg-slate-800 border-b border-r border-slate-600 rotate-45'
    : 'absolute -top-2 w-2 h-2 bg-slate-800 border-t border-l border-slate-600 rotate-45'

  return (
    <div ref={containerRef} className={`tooltip-container group ${isVisible ? 'z-50' : ''}`}>
      <div
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="cursor-help flex items-center"
      >
        {children}
        <Info className="inline-block ml-1.5 w-3 h-3 text-slate-500 hover:text-violet-400 group-hover:text-violet-400 transition-colors duration-200" />
      </div>
      {isVisible && (
        <div
          className={`absolute z-[100] ${verticalPosition} ${positionClasses[position]} w-64 px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl text-xs text-slate-200 leading-relaxed whitespace-normal break-words select-text cursor-text`}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        >
          <div className="relative">
            <div className={`${arrowPosition} ${arrowClasses[position]}`}></div>
            {content}
          </div>
        </div>
      )}
    </div>
  )
}

export default Tooltip
