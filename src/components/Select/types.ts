import { ColorsTypes, SizeTypes } from "@/utils/commonTypes";

export type OptionsType = {
  label: string;
  id: string;
};

export type SelectProps = {
  Options: OptionsType[];
  placeholder?: string;
  values: OptionsType[] | OptionsType;
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
  setValues: React.Dispatch<React.SetStateAction<OptionsType | OptionsType[]>>;
};
