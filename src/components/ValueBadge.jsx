import Tooltip from './Tooltip'

const ValueBadge = ({ value, detail }) => {
  if (!value || value === 'null' || value === null) {
    return <span className="text-slate-600">—</span>
  }

  const normalizedValue = value.toLowerCase()

  const getBadgeClass = () => {
    switch (normalizedValue) {
      case 'yes':
        return 'badge-success'
      case 'no':
        return 'badge-error'
      case 'partial':
      case 'limited':
        return 'badge-warning'
      default:
        return 'badge-neutral'
    }
  }

  const className = getBadgeClass()

  const badge = (
    <span className={className}>
      <span className="capitalize tracking-wide">{normalizedValue}</span>
    </span>
  )

  if (detail) {
    return <Tooltip content={detail}>{badge}</Tooltip>
  }

  return badge
}

export default ValueBadge
