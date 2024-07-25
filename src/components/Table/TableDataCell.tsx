import React, { useMemo } from 'react'

import { classMapper } from '@/utils/helper'
import { TableDataCellProps } from './types'

const TableDataCell = <T,>({ column, row, index, tableCellStyle }: TableDataCellProps<T>) => {
  const classes = useMemo(() => {
    return classMapper('table-data-cell', {
      [column.textAlign as string]: column?.textAlign,
      [`fixed-${column.fixed}`]: column.fixed,
    })
  }, [column])

  const cellContent = useMemo<React.ReactNode>(() => {
    const value = row[column.dataKey as keyof typeof row]
    return column?.render ? column.render(value, row, index, column) : String(value)
  }, [column, row, index])

  return (
    <td className={classes} style={tableCellStyle} {...column?.onCell?.(row[column.dataKey as keyof typeof row], row, index, column)}>
      {cellContent}
    </td>
  )
}

export default TableDataCell
