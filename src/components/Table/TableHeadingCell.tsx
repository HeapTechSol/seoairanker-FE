import { classMapper } from "@/utils/helper";

import { TableHeadingCellTypes } from "./types";

import { orderMapper } from "./helper";

const TableHeadingCell = (props: TableHeadingCellTypes) => {
  const { column } = props;

  const columnWidth = {
    width: `${column?.width ? column?.width + "%" : "auto"}`,
    ...props?.tableHeadingStyle,
  };

  const classes = classMapper("table-heading-cell", {
    [column?.textAlign as string]: column?.textAlign,
    [`fixed-${column.fixed}`]: column.fixed,
  });

  const sortClasses = classMapper("sorting-order-icons", {
    [props?.order as string]: props?.order ? true : false,
  });

  return (
    <>
      <th
        style={columnWidth}
        className={classes}
        onClick={() =>
          column?.sortKey
            ? props?.onSort?.(
                column?.dataKey,
                orderMapper(column?.sortKey as string),
              )
            : null
        }
      >
        {column?.header}
        {column?.sortKey ? <span className={sortClasses}></span> : null}
      </th>
    </>
  );
};

export default TableHeadingCell;
