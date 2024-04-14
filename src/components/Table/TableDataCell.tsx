import { classMapper } from '@/utils/helper';
import { TableDataCellTypes } from './types';

const TableDataCell = (props: TableDataCellTypes) => {
  const { column, row } = props;

  const classes = classMapper('table-data-cell', {
    [column.textAlign as string]: column?.textAlign,
    [`fixed-${column.fixed}`]: column.fixed,
  });

  return <td className={classes}>{column?.render ? column.render?.(row[column.dataKey], row, column) : row[column.dataKey]}</td>;
};

export default TableDataCell;
