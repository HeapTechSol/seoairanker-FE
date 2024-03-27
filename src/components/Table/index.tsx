import { Fragment } from "react";
import TableDataCell from "./TableDataCell";
import TableHeadingCell from "./TableHeadingCell";
import useTableScroll from "@/hooks/useTableScroll";

import { TableProps } from "./types";

import Checkbox from "../Checkbox";

import "./Table.scss";

const Table = (props: TableProps) => {
  const { tableRef } = useTableScroll();

  const isExpandableRow = (data: any) =>
    props.expandable &&
    props.onRowSelection?.selectedRowKeys?.includes(
      data[props.rowKey as string]
    );

  return (
    <table className="table" ref={tableRef}>
      <thead>
        <tr>
          {props.onRowSelection && props.onRowSelection.type && (
            <th className="optional-table-cell fixed-left">
              <Checkbox
                name="selector"
                checked={
                  props.data.length ==
                  props.onRowSelection.selectedRowKeys.length
                }
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
              {props.onRowSelection && props.onRowSelection.type && (
                <td className="optional-table-cell fixed-left">
                  {
                    <Checkbox
                      name="selector"
                      checked={props.onRowSelection?.selectedRowKeys.includes(
                        data[props.rowKey as string]
                      )}
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
              {props.columns?.map((column, index) => (
                <TableDataCell
                  row={data}
                  column={column}
                  key={`${column.header}${index}`}
                />
              ))}
            </tr>

            {isExpandableRow(data) && (
              <tr>{props.expandable?.expandedRowRender?.(data)}</tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
