import React, { KeyboardEvent } from "react";

export type ColorsTypes =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "common"
  | "grayClr-50"
  | "grayClr-100"
  | "grayClr-200"
  | "grayClr-300"
  | "grayClr-400"
  | "grayClr-500"
  | "grayClr-600"
  | "grayClr-700"
  | "grayClr-800"
  | "grayClr-900";
export type OnClickTypes = (
  event: React.MouseEvent | KeyboardEvent<HTMLButtonElement>
) => void;
export type SizeTypes = "sm" | "md" | "lg";
