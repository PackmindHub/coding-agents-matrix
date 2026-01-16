import ValueBadge from './ValueBadge'
import { Github, Star, ExternalLink } from 'lucide-react'

const TableCell = ({ value, type = 'text', detail }) => {
  if (type === 'badge') {
    return (
      <td className="px-4 py-3 text-sm whitespace-nowrap">
        <ValueBadge value={value} detail={detail} />
      </td>
    )
  }

  if (type === 'type') {
    const isOpenSource = value === 'Open Source'
    return (
      <td className="px-4 py-3 text-sm whitespace-nowrap">
        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border backdrop-blur-sm ${
          isOpenSource
            ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
            : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
        }`}>
          {value}
        </span>
      </td>
    )
  }

  if (type === 'github') {
    if (!value) {
      return (
        <td className="px-4 py-3 text-sm whitespace-nowrap">
          <span className="text-slate-600">—</span>
        </td>
      )
    }

    const match = value.match(/github\.com\/([^\/]+)\/([^\/]+)/)
    const repoSlug = match ? `${match[1]}/${match[2].replace('.git', '')}` : value

    return (
      <td className="px-4 py-3 text-sm whitespace-nowrap">
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-300 transition-colors duration-200 font-mono text-xs"
        >
          <Github className="w-3.5 h-3.5" />
          <span>{repoSlug}</span>
          <ExternalLink className="w-3 h-3 opacity-50" />
        </a>
      </td>
    )
  }

  if (type === 'stars') {
    if (!value) {
      return (
        <td className="px-4 py-3 text-sm whitespace-nowrap">
          <span className="text-slate-600">—</span>
        </td>
      )
    }

    const formatted = value.toLocaleString('en-US')

    return (
      <td className="px-4 py-3 text-sm whitespace-nowrap">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs"
          title={detail || ''}
        >
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span className="font-semibold">{formatted}</span>
        </span>
      </td>
    )
  }

  return (
    <td className="px-4 py-3 text-sm text-slate-200 whitespace-nowrap font-medium">
      {value || '—'}
    </td>
  )
}

export default TableCell
