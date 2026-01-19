import { ArrowUp, ArrowDown } from 'lucide-react'
import Tooltip from './Tooltip'

const TableHeader = ({ columns, sortConfig, onSort, groups }) => {
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

  // Build column key set for quick lookup
  const columnKeys = new Set(columns.map(col => col.key))

  // Calculate colspan for each group based on visible columns
  const orderedGroups = groups.map(group => {
    const visibleColumns = group.columns.filter(colKey => columnKeys.has(colKey))
    return {
      ...group,
      colSpan: visibleColumns.length
    }
  }).filter(group => group.colSpan > 0)

  return (
    <thead className="table-header">
      {/* Meta-header row */}
      <tr className="border-b border-slate-700/30">
        {orderedGroups.map((group, index) => (
          <th
            key={group.id}
            colSpan={group.colSpan}
            className={`px-4 py-2 text-center text-xs font-bold text-slate-300 uppercase tracking-wider bg-slate-800/30${index < orderedGroups.length - 1 ? ' border-r-2 border-slate-600/50' : ''}`}
          >
            {group.label}
          </th>
        ))}
      </tr>

      {/* Column header row */}
      <tr className="border-b border-slate-700/50">
        {columns.map((column, index) => {
          const tooltipPosition = index === 0 ? 'left' : index === columns.length - 1 ? 'right' : 'center'
          return (
            <th
              key={column.key}
              onClick={() => column.sortable && handleSort(column.key)}
              className={`${column.sortable ? 'table-header-cell-sortable' : 'table-header-cell'}${column.isGroupBoundary ? ' border-r-2 border-slate-600/50' : ''}`}
            >
              <div className="flex items-center">
                <Tooltip content={column.tooltip} position={tooltipPosition}>
                  <span className={sortConfig.key === column.key ? 'text-violet-400' : ''}>
                    {column.label}
                  </span>
                </Tooltip>
                {column.sortable && getSortIcon(column.key)}
              </div>
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

export default TableHeader
