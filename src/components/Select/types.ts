import { ColorsTypes, SizeTypes } from "@/utils/commonTypes";

export type OptionsType = {
  label: string;
  id: string;
};

export type SelectProps = {
  Options: OptionsType[];
  placeholder?: string;
  values: string | string[];
  multiple?: boolean;
  searchable?: boolean;
  selectAllOption?: boolean;
  loading?: boolean;
  onScroll?: (value: boolean) => void;
  minWidth?: number;
  color?: ColorsTypes;
  size?: SizeTypes;
  title?: string;
  titlePosition?: "top" | "inside";
  error?:string;
  setValues: React.Dispatch<React.SetStateAction<string | string[]>>;
};
