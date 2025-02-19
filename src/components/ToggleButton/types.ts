export type ToggleButtonTypes = {
  id?:string;
  label?: string;
  color?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (val:boolean) => void;
  defaultChecked?:boolean
  labelPosition?: "left" | "right" | "top" | "bottom";
};
