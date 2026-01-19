import ValueBadge from './ValueBadge'
import { Github, ExternalLink } from 'lucide-react'

const TableCell = ({ value, type = 'text', detail, link, isGroupBoundary }) => {
  const borderClass = isGroupBoundary ? ' border-r-2 border-slate-600/50' : ''

  if (type === 'badge') {
    return (
      <td className={`px-4 py-3 text-sm whitespace-nowrap${borderClass}`}>
        <ValueBadge value={value} detail={detail} />
      </td>
    )
  }

  if (type === 'openSource') {
    const displayValue = value === 'Open Source' ? 'Yes' : 'No'
    return (
      <td className={`px-4 py-3 text-sm whitespace-nowrap${borderClass}`}>
        <ValueBadge value={displayValue} detail={detail} />
      </td>
    )
  }

  if (type === 'github') {
    if (!value) {
      return (
        <td className={`px-4 py-3 text-sm whitespace-nowrap${borderClass}`}>
          <span className="text-slate-600">—</span>
        </td>
      )
    }

    const match = value.match(/github\.com\/([^\/]+)\/([^\/]+)/)
    const repoSlug = match ? `${match[1]}/${match[2].replace('.git', '')}` : value

    return (
      <td className={`px-4 py-3 text-sm whitespace-nowrap${borderClass}`}>
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="link-brand-mono"
        >
          <Github className="w-3.5 h-3.5" />
          <span>{repoSlug}</span>
          <ExternalLink className="w-3 h-3 opacity-50" />
        </a>
      </td>
    )
  }

  if (type === 'website') {
    if (!value) {
      return (
        <td className={`px-4 py-3 text-sm whitespace-nowrap${borderClass}`}>
          <span className="text-slate-600">—</span>
        </td>
      )
    }

    let domain
    try {
      domain = new URL(value).hostname.replace('www.', '')
    } catch {
      domain = value
    }

    return (
      <td className={`px-4 py-3 text-sm whitespace-nowrap${borderClass}`}>
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="link-brand"
        >
          <span>{domain}</span>
          <ExternalLink className="w-3 h-3 opacity-50" />
        </a>
      </td>
    )
  }

  if (type === 'nameLink') {
    // No website - render as plain text
    if (!link) {
      return (
        <td className={`px-4 py-3 text-sm text-slate-200 whitespace-nowrap font-medium${borderClass}`}>
          {value || '—'}
        </td>
      )
    }

    // With website - render as clickable link
    return (
      <td className={`px-4 py-3 text-sm whitespace-nowrap font-medium${borderClass}`}>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-slate-200 hover:text-violet-400 transition-colors duration-200 group"
        >
          <span>{value}</span>
          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity duration-200" />
        </a>
      </td>
    )
  }

  if (type === 'stars') {
    if (!value) {
      return (
        <td className={`px-4 py-3 text-sm whitespace-nowrap${borderClass}`}>
          <span className="text-slate-600">—</span>
        </td>
      )
    }

    const formatted = value.toLocaleString('en-US')

    const starsBadge = (
      <span
        className="badge-stars"
        title={detail || ''}
      >
        <span className="font-semibold">{formatted}</span>
      </span>
    )

    return (
      <td className={`px-4 py-3 text-sm whitespace-nowrap${borderClass}`}>
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            {starsBadge}
          </a>
        ) : (
          starsBadge
        )}
      </td>
    )
  }

  return (
    <td className={`px-4 py-3 text-sm text-slate-200 whitespace-nowrap font-medium${borderClass}`}>
      {value || '—'}
    </td>
  )
}

export default TableCell
