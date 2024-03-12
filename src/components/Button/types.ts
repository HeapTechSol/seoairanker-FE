import { ColorsTypes, OnClickTypes, SizeTypes } from "@/utils/commonTypes";

export type ButtonTypes = {
  children?: string | React.ReactNode;
  size?: SizeTypes;
  variant?: "filled" | "outlined" | "text";
  disabled?: boolean;
  StartIcon?: string | JSX.Element;
  EndIcon?: string | JSX.Element;
  loading?: boolean;
  className?: string;
  onlyIcon?: boolean;
  type?: "square" | "circle" | "borderRadius";
  color?: ColorsTypes;
  onClick?: OnClickTypes;
  fullWidth?: boolean;
  borderRadius?: boolean;
  id?: string;
};
