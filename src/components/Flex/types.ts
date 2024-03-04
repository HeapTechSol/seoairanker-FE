import React, { ReactNode } from "react";

export type FlexPropsTypes = {
  vertical?: boolean;
  gap?: number;
  rowReverse?: boolean;
  columnReverse?: boolean;
  justify?: "between" | "center" | "evenly" | "start" | "end";
  align?: "between" | "center" | "evenly" | "start" | "end";
  children: JSX.Element | ReactNode | string;
  className?:string
  onClick?:(val?:React.SyntheticEvent)=>void
};
