import TableCell from './TableCell'

const TableRow = ({ agent, columns }) => {
  return (
    <tr className="table-row group">
      {columns.map((column) => (
        <TableCell
          key={column.key}
          value={agent[column.key]}
          detail={agent[column.key + 'Detail']}
          type={column.cellType}
          link={
            column.key === 'ghStars' ? agent.github :
            column.key === 'name' ? agent.website :
            null
          }
          isGroupBoundary={column.isGroupBoundary}
        />
      ))}
    </tr>
  )
}

export default TableRow
