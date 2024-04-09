import { classMapper } from "@/utils/helper";
import { RadioButtonTypes } from "./types";

import "./RadioButton.scss";

const RadioButton = ({
  id,
  name,
  label,
  checked,
  disabled,
  onChange,
  restricted=false,
  size = "md",
  color = "primary",
  labelPosition = "left",
}: RadioButtonTypes) => {
  const classes = classMapper("radio-button-container", {
    [labelPosition]: labelPosition,
    [color]: color,
    [size]: size,
    pointer: !!onChange,
    restricted: restricted,
  });

  const buttonLabel = label && <label htmlFor={id}>{label}</label>;

  return (
    <div className={classes}>
      {buttonLabel}
      <input
        id={id}
        type="radio"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        name={name}
      />
    </div>
  );
};

export default RadioButton;
