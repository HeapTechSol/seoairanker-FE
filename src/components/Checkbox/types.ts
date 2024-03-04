export type CheckboxTypes = {
  label?: string;
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  checked?: boolean;
  color?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  size?: 'sm' | 'md' | 'lg';
  name:string;
  onChange: (event: React.ChangeEvent<HTMLInputElement> | boolean) => void;
};
