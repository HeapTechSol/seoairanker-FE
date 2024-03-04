import { classMapper } from '@/utils/helper';

import { ToggleButtonTypes } from './types';

import './ToggleButton.scss';

const ToggleButton = ({
  label,
  labelPosition = 'left',
  checked,
  disabled = false,
  color = 'primary',
  onChange,
}: ToggleButtonTypes) => {
  const classes = classMapper('switch-container', { [labelPosition]: labelPosition, [color]: color, disabled: disabled });

  const buttonLabel = label && (
    <label className="label" htmlFor={label}>
      {label}
    </label>
  );

  return (
    <div className={classes}>
      {buttonLabel}
      <div className="switch" onClick={onChange}>
        <input className="toggle-input" id={label} type="checkbox" checked={checked} disabled={disabled} />
        <label className="slider" htmlFor="toggle"></label>
      </div>
    </div>
  );
};

export default ToggleButton;
