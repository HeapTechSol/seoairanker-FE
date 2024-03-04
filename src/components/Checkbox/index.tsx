import { KeyboardEvent } from "react";

import { classMapper } from "@/utils/helper";
import { CheckboxTypes } from "./types";

import "./Checkbox.scss";

const Checkbox = ({
  label,
  labelPosition = "left",
  checked,
  indeterminate = false,
  disabled,
  color = "primary",
  size = "md",
  onChange,
  name,
}: CheckboxTypes) => {
  const classes = classMapper("checkbox-container", {
    [labelPosition]: labelPosition,
    [color]: color,
    indeterminate: indeterminate,
    [size]: size,
  });

  const buttonLabel = label && <label htmlFor={label}>{label}</label>;

  const onEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onChange?.(!checked);
    }
  };

  return (
    <div className={classes}>
      {buttonLabel}
      <input
        tabIndex={0}
        id={label}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        onKeyDown={onEnterPress}
        disabled={disabled}
      />
    </div>
  );
};

export default Checkbox;
