import { classMapper } from '@/utils/helper';
import { RadioButtonTypes } from './types';

import './RadioButton.scss';

const RadioButton = ({
  label,
  labelPosition = 'left',
  checked,
  disabled,
  name,
  color = 'primary',
  onChange,
}: RadioButtonTypes) => {
  const classes = classMapper('radio-button-container', { [labelPosition]: labelPosition, [color]: color });

  const buttonLabel = label && <label htmlFor={label}>{label}</label>;

  return (
    <div className={classes}>
      {buttonLabel}
      <input id={label} type="radio" checked={checked} onChange={onChange} disabled={disabled} name={name}/>
    </div>
  );
};

export default RadioButton;
