import React from "react";

export type TextAreaTypes = {
  placeholder?: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  title?: string;
  titlePosition?: "top" | "inside";
  size?: "sm" | "md" | "lg";
  value?: string | number;
  variant?: "outlined" | "underlined";
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  borderRadius?: boolean;
  onChange?: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
  StartIcon?: string | JSX.Element;
  EndIcon?: string | JSX.Element;
  hideIncrementNumber?: boolean;
};
