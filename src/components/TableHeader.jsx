import { ArrowUp, ArrowDown } from 'lucide-react'
import Tooltip from './Tooltip'

const TableHeader = ({ columns, sortConfig, onSort }) => {
  const handleSort = (key) => {
    if (!key) return

    let direction = 'asc'
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc'
      } else if (sortConfig.direction === 'desc') {
        direction = null
      }
    }

    onSort({ key, direction })
  }

  const getSortIcon = (key) => {
    if (sortConfig.key !== key || !sortConfig.direction) {
      return null
    }

    return sortConfig.direction === 'asc'
      ? <ArrowUp className="w-4 h-4 ml-2 text-violet-400" />
      : <ArrowDown className="w-4 h-4 ml-2 text-violet-400" />
  }

  return (
    <thead className="bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-700/50">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            onClick={() => column.sortable && handleSort(column.key)}
            className={`px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-widest ${
              column.sortable ? 'cursor-pointer hover:bg-slate-800/50 select-none transition-all duration-200' : ''
            }`}
          >
            <div className="flex items-center">
              <Tooltip content={column.tooltip}>
                <span className={sortConfig.key === column.key ? 'text-violet-400' : ''}>
                  {column.label}
                </span>
              </Tooltip>
              {column.sortable && getSortIcon(column.key)}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
