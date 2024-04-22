export type ColumnsTypes = {
  header: string;
  dataKey: string;
  sortKey?: string;
  width?: number;
  textAlign?: "center" | "right";
  fixed?: "left" | "right";
  skip?:number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: any, index:number, column: ColumnsTypes) => any;
  onCell?: (value: any, row: any, index:number, column: ColumnsTypes) => any;
};

export type TableDataCellTypes = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any;
  column: ColumnsTypes;
  index:number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCell?:(value: any, row: any, index:number, column: ColumnsTypes) => any;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (newSelectedKeys: string | string[], data?: any) => void;
};

export type TableProps = {
  columns: ColumnsTypes[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  onSort?: OnSortType;
  order?: null | string;
  onRowSelection?: RowSelectionType;
  rowKey?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expandable?: any;
};
