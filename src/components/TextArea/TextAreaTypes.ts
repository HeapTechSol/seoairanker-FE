import React from "react";

export type TextAreaTypes = {
  placeholder?: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  isResizeAble?: boolean;
  error?: string;
  title?: string;
  size?: "sm" | "md" | "lg";
  value?: string | number;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  borderRadius?: boolean;
  onChange?: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
