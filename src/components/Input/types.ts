import React from "react";

export type InputTypes = {
  placeholder?: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  title?: string;
  size?: "sm" | "md" | "lg";
  value?: string | number;
  titlePosition?: "top" | "inside";
  type?: "text" | "number" | "password" | "email";
  variant?: "outlined" | "underlined";
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  borderRadius?: boolean;
  onChange?: (value: React.ChangeEvent) => void;
  startIcon?: string;
  endIcon?: string;
  hideIncrementNumber?: boolean;
};
