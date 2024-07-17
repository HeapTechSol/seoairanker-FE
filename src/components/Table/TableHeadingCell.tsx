import { useMemo } from 'react'
import { classMapper } from '@/utils/helper'
import { orderMapper } from './helper'
import { TableHeadingCellProps } from './types'

const TableHeadingCell = <T,>({ column, onSort, order, tableHeadingStyle }: TableHeadingCellProps<T>) => {
  const columnWidth = {
    width: `${column?.width ? column?.width + '%' : 'auto'}`,
    ...tableHeadingStyle,
  }

  const classes = useMemo(() => {
    return classMapper('table-heading-cell', {
      [column?.textAlign as string]: column?.textAlign,
      [`fixed-${column.fixed}`]: column.fixed,
    })
  }, [column])

  const sortClasses = useMemo(() => {
    return classMapper('sorting-order-icons', {
      [order as string]: order ? true : false,
    })
  }, [order])

  return (
    <th
      style={columnWidth}
      className={classes}
      onClick={() => (column?.sortKey ? onSort?.(column?.dataKey as string, orderMapper(column?.sortKey as string)) : null)}
    >
      {column?.header}
      {column?.sortKey ? <span className={sortClasses}></span> : null}
    </th>
  )
}

export default TableHeadingCell
