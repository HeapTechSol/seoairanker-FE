import React, { KeyboardEvent } from "react";

export type ColorsTypes =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "common";
export type OnClickTypes = (
  event: React.MouseEvent | KeyboardEvent<HTMLButtonElement>,
) => void;
export type SizeTypes = "sm" | "md" | "lg";
