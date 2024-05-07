import { Fragment } from "react";

import Checkbox from "../Checkbox";
import TableDataCell from "./TableDataCell";
import TableHeadingCell from "./TableHeadingCell";
import useTableScroll from "@/hooks/useTableScroll";

import { TableProps } from "./types";

import "./Table.scss";

const Table = (props: TableProps) => {
  const { tableRef } = useTableScroll();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isExpandableRow = (data: any) =>
    props.expandable &&
    props.onRowSelection?.selectedRowKeys?.includes(
      data[props.rowKey as string]
    );

  return (
    <table className="table" ref={tableRef}>
      <thead>
        <tr>
          {props.onRowSelection && props.onRowSelection.type === "checkbox" && (
            <th className="optional-table-cell fixed-left">
              <Checkbox
                name="selector"
                checked={
                  props.data.length ==
                  props.onRowSelection.selectedRowKeys.length
                }
                borderRadius
                onChange={() =>
                  props.onRowSelection?.onChange(
                    props.data.map((item) => item[props.rowKey as string])
                  )
                }
              />
            </th>
          )}

          {props.columns?.map((column, index) => (
            <TableHeadingCell
              column={column}
              tableHeadingStyle={props.style?.tableHeadingStyle}
              {...props}
              key={`${column.header}${index}`}
            />
          ))}
        </tr>
      </thead>

      <tbody>
        {props.data.map((data, index) => (
          <Fragment key={`${data.id}${index}`}>
            <tr>
              {props.onRowSelection &&
                props.onRowSelection.type === "checkbox" && (
                  <td className="optional-table-cell fixed-left">
                    {
                      <Checkbox
                        name="selector"
                        checked={props.onRowSelection?.selectedRowKeys.includes(
                          data[props.rowKey as string]
                        )}
                        borderRadius
                        onChange={() =>
                          props.onRowSelection?.onChange(
                            data[props.rowKey as string],
                            data
                          )
                        }
                      />
                    }
                  </td>
                )}
              {props.columns?.map((column, colIndex) => (
                <TableDataCell
                  row={data}
                  column={column}
                  index={index}
                  {...props}
                  tableCellStyle={props.style?.tableCellStyle}
                  key={`${column.header}${colIndex}`}
                />
              ))}
            </tr>

            {(props.onRowSelection?.allRowsOpenedByDefault ||
              isExpandableRow(data)) && (
              <>{props.expandable?.expandedRowRender?.(data)}</>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
