export interface menuTypes {
  name: string;
  icon?: string | JSX.Element;
  path: string;
  children?: menuTypes[];
}

export type MenuPropsTypes = {
  menu: menuTypes;
  className?: string;
  index: string;
  clickHandler: (value: React.MouseEvent) => void;
};
