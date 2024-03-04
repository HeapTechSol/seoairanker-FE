import { ChipPropsTypes } from './types';

import { classMapper } from '@/utils/helper';

import './Chip.scss';

const Chip = ({
  bordered = false,
  rounded = false,
  circled = false,
  variant = 'outlined',
  onClick,
  color = 'primary',
  size = 'md',
  text,
  iconPlacement = 'end',
  Icon,
}: ChipPropsTypes) => {
  const chipStyleClasses = classMapper('chip', {
    bordered: bordered,
    rounded: rounded,
    circled: circled,
    [variant]: variant,
    [color]: color,
    [size]: size,
    [iconPlacement]: iconPlacement,
    primary: true,
  });

  const isSvgIcon = typeof Icon === 'object' && Icon.type === 'svg';
  const IconPassed = isSvgIcon ? Icon : <img src={Icon as string} alt="tag logo" />;

  return (
    <span className={chipStyleClasses} onClick={onClick}>
      {text}
      <span className="tag-bg-color"></span>
      {Icon && IconPassed}
    </span>
  );
};

export default Chip;
