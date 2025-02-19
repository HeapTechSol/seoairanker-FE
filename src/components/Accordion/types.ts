export type AccordionTypes = {
  description: string | JSX.Element;
  title: string | JSX.Element;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  arrowIcon?: boolean;
  onTitleClick?: boolean;
  className?:string
  ActionButton?:JSX.Element | React.ReactNode
};
