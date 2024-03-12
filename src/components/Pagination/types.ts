import { SizeTypes } from "@/utils/commonTypes";
import { OptionsType } from "../Select/types";
import { ChangeEvent } from "react";

export type PaginationHookPropsTypes = {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
};

export type PaginationPropsTypes = {
  onPageChange: (val: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
  size?: SizeTypes;
  showSizeChanger?: {
    onPageSizeChange: (val: OptionsType | OptionsType[]) => void;
    rowReverse?: boolean;
    pageSizeOptions: OptionsType[];
  };
  showPageInput?: {
    onPageInputChange: (val: ChangeEvent<Element>) => void;
    rowReverse?: true;
  };
};
