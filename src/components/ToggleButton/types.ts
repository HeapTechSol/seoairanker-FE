export type ToggleButtonTypes = {
  label?: string;
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  checked?: boolean;
  color?: string;
  disabled?:boolean;
  onChange?: () => void;
};
