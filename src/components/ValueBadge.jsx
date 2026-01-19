import { Check, X, CircleDot } from 'lucide-react'
import Tooltip from './Tooltip'

const ValueBadge = ({ value, detail }) => {
  if (!value || value === 'null' || value === null) {
    return <span className="text-slate-600">—</span>
  }

  const normalizedValue = value.toLowerCase()

  const getBadgeClass = () => {
    switch (normalizedValue) {
      case 'yes':
        return {
          className: 'badge-success',
          icon: <Check className="w-3.5 h-3.5" />
        }
      case 'no':
        return {
          className: 'badge-error',
          icon: <X className="w-3.5 h-3.5" />
        }
      case 'partial':
      case 'limited':
        return {
          className: 'badge-warning',
          icon: <CircleDot className="w-3.5 h-3.5" />
        }
      default:
        return {
          className: 'badge-neutral',
          icon: null
        }
    }
  }

  const { className, icon } = getBadgeClass()

  const badge = (
    <span className={className}>
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
