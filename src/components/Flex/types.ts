import React, { ReactNode } from "react";

export type FlexPropsTypes = {
  vertical?: boolean;
  gap?: number;
  padding?: number | string;
  rowReverse?: boolean;
  columnReverse?: boolean;
  justify?: "between" | "center" | "evenly" | "start" | "end";
  align?: "between" | "center" | "evenly" | "start" | "end";
  children: JSX.Element | ReactNode | string;
  className?: string;
  wrap?: boolean;
  onClick?: (val: React.SyntheticEvent) => void;
  ref: React.Ref<HTMLDivElement>;
  inline?:boolean
};
