import { useRef } from "react";

import { InputTypes } from "./types";

import { classMapper } from "@/utils/helper";

import "./Input.scss";

const Input = ({
  placeholder,
  name,
  type,
  disabled,
  required,
  error = "",
  title,
  variant = "outlined",
  size = "md",
  value,
  titlePosition = "inside",
  color = "primary",
  borderRadius = false,
  hideIncrementNumber = false,
  startIcon,
  endIcon,
  onChange,
}: InputTypes) => {
  const inputRef = useRef<HTMLFieldSetElement>(null);

  const classes = classMapper(
    "input-field",
    { [variant]: variant },
    { [size]: size },
    { error: error && !disabled },
    { focused: value || (error && !disabled) ? true : false },
    { [titlePosition]: titlePosition && title },
    { [color]: color },
    { "hide-number-increment": hideIncrementNumber },
    { radius: borderRadius && variant !== "underlined" },
    { startIcon: startIcon },
    { endIcon: endIcon },
    { required: required && title }
  );

  const iconStart = startIcon && (
    <span className="input-icon">
      <img src={startIcon} alt="" />
    </span>
  );

  const iconEnd = endIcon && (
    <span className="input-icon">
      <img src={endIcon} alt="" />
    </span>
  );

  const topTitle = titlePosition === "top" && (
    <label htmlFor={title}>{title}</label>
  );

  const errorMessage = error && !disabled && (
    <p className="error-text">{error}</p>
  );

  return (
    <div className="input-field-container">
      {topTitle}
      <fieldset className={classes} ref={inputRef} disabled={disabled}>
        {title && <legend>{title}</legend>}
        {iconStart}
        <input
          autoComplete="new-password"
          id={title}
          placeholder={placeholder}
          name={name}
          type={type}
          disabled={disabled}
          required={required}
          value={value}
          onBlur={() => {
            if (value || error) return;
            inputRef.current?.classList.remove("focused");
          }}
          onFocus={() => inputRef.current?.classList.add("focused")}
          onChange={onChange}
        />
        {iconEnd}
      </fieldset>
      {errorMessage}
    </div>
  );
};

export default Input;
