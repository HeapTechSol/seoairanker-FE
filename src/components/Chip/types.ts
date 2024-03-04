import { ColorsTypes, OnClickTypes, SizeTypes } from '@/utils/commonTypes';

export type ChipPropsTypes = {
  bordered?: boolean;
  rounded?: boolean;
  circled?: boolean;
  onClick?: OnClickTypes;
  color?: ColorsTypes;
  size?: SizeTypes;
  text?: string;
  Icon?: string |  JSX.Element;
  iconPlacement?: 'start' | 'end';
  variant?: 'filled' | 'outlined';
};
