import { KeyboardEvent } from "react";

export type CheckboxTypes = {
  name: string;
  label?: string;
  color?: string;
  checked?: boolean;
  disabled?: boolean;
  borderRadius?: boolean;
  indeterminate?: boolean;
  size?: "sm" | "md" | "lg";
  labelPosition?: "left" | "right" | "top" | "bottom";
  onChange?: (event: React.ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>) => void;
};
