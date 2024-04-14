export type ColumnsTypes = {
  header: string;
  dataKey: string;
  sortKey?: string;
  width?: number;
  textAlign?: "center" | "right";
  fixed?: "left" | "right";
  render?: (value: any, row: any, column: ColumnsTypes) => any;
};

export type TableDataCellTypes = {
  row: any;
  column: ColumnsTypes;
};

export type TableHeadingCellTypes = {
  column: ColumnsTypes;
  onSort?: OnSortType;
  order?: null | string;
};

export type OnSortType = (sortKey: string, order: string | null) => void;

export type RowSelectionType = {
  type: string;
  selectedRowKeys: string[];
  onChange: (newSelectedKeys: string | string[], data?: any) => void;
};

export type TableProps = {
  columns: ColumnsTypes[];
  data: any[];
  onSort?: OnSortType;
  order?: null | string;
  onRowSelection?: RowSelectionType;
  rowKey?: string;
  expandable?: any;
};
