import { ColorsTypes, SizeTypes } from "@/utils/commonTypes";

export type RadioButtonTypes = {
  id?: string;
  restricted?:boolean;
  name?: string;
  size?: SizeTypes;
  checked?: boolean;
  disabled?: boolean;
  color?: ColorsTypes;
  readOnly?:boolean
  label?: string | JSX.Element | React.ReactNode;
  labelPosition?: "left" | "right" | "top" | "bottom";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
