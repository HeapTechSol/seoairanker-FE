export type ColumnType<T> = {
  header: string;
  dataKey?: keyof T | string;
  sortKey?: string;
  width?: number;
  textAlign?: "center" | "right";
  fixed?: "left" | "right";
  render?: (value: any, row: T, index: number, column: ColumnType<T>) => React.ReactNode;
  onCell?: (value: any, row: T, index: number, column: ColumnType<T>) => React.HTMLAttributes<HTMLTableCellElement>;
};

export type OnSortType = (sortKey: string, order: string | null) => void;

export type RowSelectionType<T, K> = {
  type?: string;
  selectedRowKeys: K[];
  allRowsOpenedByDefault?: boolean;
  onChange: (newSelectedKeys: K[], data?: T) => void;
};

export type TableProps<T, K> = {
  columns: ColumnType<T>[];
  data: T[];
  onSort?: OnSortType;
  order?: null | string;
  onRowSelection?: RowSelectionType<T, K>;
  onRowClick?: (newSelectedKeys: K[], data?: T) => void;
  rowKey?: keyof T;
  expandable?: {
    expandedRowRender?: (data: T) => React.ReactNode;
  };
  style?: {
    tableCellStyle?: React.CSSProperties;
    tableHeadingStyle?: React.CSSProperties;
  };
};

export type TableDataCellProps<T> = {
  column: ColumnType<T>;
  row: T;
  index: number;
  tableCellStyle?: React.CSSProperties;
};

export type TableHeadingCellProps<T> = {
  column: ColumnType<T>;
  onSort?: OnSortType;
  order?: null | string;
  tableHeadingStyle?: React.CSSProperties;
};
