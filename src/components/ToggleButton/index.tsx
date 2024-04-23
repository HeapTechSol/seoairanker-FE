import { classMapper } from "@/utils/helper";

import { ToggleButtonTypes } from "./types";

import "./ToggleButton.scss";
import { useRef } from "react";

const ToggleButton = ({
  label,
  labelPosition = "left",
  checked = false,
  disabled = false,
  color = "primary",
  onChange,
  id = "toggle",
}: ToggleButtonTypes) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const classes = classMapper("switch-container", {
    [labelPosition]: labelPosition,
    [color]: color,
    disabled: disabled,
  });

  const handleToggleClick = () => {
    if (inputRef.current) {
      inputRef.current?.click();
    }
  };

  const buttonLabel = label && (
    <label className="label" htmlFor={id}>
      {label}
    </label>
  );

  return (
    <div className={classes} onClick={handleToggleClick}>
      {buttonLabel}
      <div className="switch">
        <input
          className="toggle-input"
          id={id}
          ref={inputRef}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
        <label className="slider" htmlFor={id} onClick={(e)=>e.stopPropagation()}></label>
      </div>
    </div>
  );
};

export default ToggleButton;
