import { Check, X, CircleDot } from 'lucide-react'
import Tooltip from './Tooltip'

const ValueBadge = ({ value, detail }) => {
  if (!value || value === 'null' || value === null) {
    return <span className="text-slate-600">—</span>
  }

  const normalizedValue = value.toLowerCase()

  const getBadgeStyle = () => {
    switch (normalizedValue) {
      case 'yes':
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/30',
          text: 'text-emerald-400',
          glow: 'shadow-emerald-500/20',
          icon: <Check className="w-3.5 h-3.5" />
        }
      case 'no':
        return {
          bg: 'bg-rose-500/10',
          border: 'border-rose-500/30',
          text: 'text-rose-400',
          glow: 'shadow-rose-500/20',
          icon: <X className="w-3.5 h-3.5" />
        }
      case 'partial':
      case 'limited':
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/30',
          text: 'text-amber-400',
          glow: 'shadow-amber-500/20',
          icon: <CircleDot className="w-3.5 h-3.5" />
        }
      default:
        return {
          bg: 'bg-slate-500/10',
          border: 'border-slate-500/30',
          text: 'text-slate-400',
          glow: 'shadow-slate-500/20',
          icon: null
        }
    }
  }

  const { bg, border, text, glow, icon } = getBadgeStyle()

  const badge = (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border backdrop-blur-sm ${bg} ${border} ${text} ${glow} shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105`}>
      {icon}
      <span className="capitalize tracking-wide">{normalizedValue}</span>
    </span>
  )

  if (detail) {
    return <Tooltip content={detail}>{badge}</Tooltip>
  }

  return badge
}

export default ValueBadge
