import TableCell from './TableCell'

const TableRow = ({ agent, columns }) => {
  return (
    <tr className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all duration-300 group hover:shadow-lg hover:shadow-violet-500/5">
      {columns.map((column) => (
        <TableCell
          key={column.key}
          value={agent[column.key]}
          detail={agent[column.key + 'Detail']}
          type={column.cellType}
        />
      ))}
    </tr>
  )
}

export default TableRow
