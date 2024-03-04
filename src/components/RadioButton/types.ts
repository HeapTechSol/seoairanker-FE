export type RadioButtonTypes = {
    label?: string;
    labelPosition?: 'left' | 'right' | 'top' | 'bottom';
    checked?: boolean;
    color?: string;
    disabled?:boolean;
    name?:string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  