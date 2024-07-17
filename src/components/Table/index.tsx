import { Fragment } from 'react'

import Checkbox from '../Checkbox'
import TableDataCell from './TableDataCell'
import TableHeadingCell from './TableHeadingCell'
import useTableScroll from '@/hooks/useTableScroll'

import { TableProps } from './types'

import './Table.scss'

const Table = <T, K extends string | number>({
  columns,
  data,
  onSort,
  order,
  onRowSelection,
  onRowClick,
  rowKey,
  expandable,
  style,
}: TableProps<T, K>) => {
  const { tableRef } = useTableScroll()

  const isExpandableRow = (data: T) => expandable && onRowSelection?.selectedRowKeys?.includes(data[rowKey as keyof T] as unknown as K)

  return (
    <table className="table container-bg" ref={tableRef}>
      <thead>
        <tr>
          {onRowSelection && onRowSelection.type === 'checkbox' && (
            <th className="optional-table-cell fixed-left">
              <Checkbox
                name="selector"
                checked={data.length > 0 && data.every((item) => onRowSelection.selectedRowKeys.includes(item[rowKey as keyof T] as unknown as K))}
                borderRadius
                onChange={() => onRowSelection?.onChange(data.map((item) => item[rowKey as keyof T] as unknown as K))}
              />
            </th>
          )}
          {columns?.map((column, index) => (
            <TableHeadingCell<T>
              key={`${column.header}${index}`}
              column={column}
              tableHeadingStyle={style?.tableHeadingStyle}
              onSort={onSort}
              order={order}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((dataItem, index) => (
          <Fragment key={`${dataItem[rowKey as keyof T]}${index}`}>
            <tr
              onClick={() => (onRowClick ? onRowClick?.(dataItem[rowKey as keyof T] as unknown as K[], dataItem) : null)}
              style={{ cursor: onRowClick ? 'pointer' : 'auto' }}
            >
              {onRowSelection && onRowSelection.type === 'checkbox' && (
                <td className="optional-table-cell fixed-left">
                  <Checkbox
                    name="selector"
                    checked={onRowSelection.selectedRowKeys.includes(dataItem[rowKey as keyof T] as unknown as K)}
                    borderRadius
                    onChange={() => onRowSelection.onChange(dataItem[rowKey as keyof T] as unknown as K[], dataItem)}
                  />
                </td>
              )}
              {columns?.map((column, colIndex) => (
                <TableDataCell<T>
                  key={`${column.header}${colIndex}`}
                  row={dataItem}
                  column={column}
                  index={index}
                  tableCellStyle={style?.tableCellStyle}
                />
              ))}
            </tr>
            {(onRowSelection?.allRowsOpenedByDefault || isExpandableRow(dataItem)) && <>{expandable?.expandedRowRender?.(dataItem)}</>}
          </Fragment>
        ))}
      </tbody>
    </table>
  )
}

export default Table
