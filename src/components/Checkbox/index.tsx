import { KeyboardEvent } from "react";

import { CheckboxTypes } from "./types";

import { classMapper } from "@/utils/helper";

import "./Checkbox.scss";

const Checkbox = ({
  name,
  label,
  checked,
  disabled,
  onChange,
  size = "md",
  color = "primary",
  borderRadius = false,
  indeterminate = false,
  labelPosition = "left",
}: CheckboxTypes) => {
  const classes = classMapper("checkbox-container", {
    [size]: size,
    [color]: color,
    borderRadius: borderRadius,
    indeterminate: indeterminate,
    [labelPosition]: labelPosition,
  });

  const buttonLabel = label && <label htmlFor={label}>{label}</label>;

  const onEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onChange?.(e);
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
