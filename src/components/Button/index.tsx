import { KeyboardEvent } from "react";

import LoadingIcon from "@/assets/icons/loader.gif";

import { classMapper } from "@/utils/helper";

import { ButtonTypes } from "./types";

import "./Button.scss";

const Button = ({
  children,
  size = "md",
  color = "primary",
  variant = "filled",
  disabled = false,
  StartIcon,
  EndIcon,
  loading = false,
  className = "",
  onlyIcon = false,
  type = "square",
  fullWidth = false,
  noPadding = false,
  fill = false,
  onClick,
  id = "",
}: ButtonTypes) => {
  const classes = classMapper("btn", {
    [size]: size,
    [variant]: variant,
    [className]: className,
    [color]: color,
    fullWidth: fullWidth,
    pointer: !!onClick,
    "icon-button": (StartIcon || EndIcon) && onlyIcon,
    [type]: type === "circle" && !onlyIcon ? false : true,
    noPadding: noPadding,
    fill:fill
  });

  const isStartSvgIcon =
    typeof StartIcon === "object" && StartIcon?.type === "svg";
  const StartIconPassed = isStartSvgIcon ? (
    StartIcon
  ) : (
    <img src={StartIcon as string} alt="button logo" />
  );

  const isEndSvgIcon = typeof EndIcon === "object" && EndIcon?.type === "svg";
  const EndIconPassed = isEndSvgIcon ? (
    EndIcon
  ) : (
    <img src={EndIcon as string} alt="button logo" />
  );

  const loader = !disabled && loading && (
    <img src={LoadingIcon} alt="loading-icon" />
  );

  const onEnterPress = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      onClick?.(e);
    }
  };

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onEnterPress}
      id={id}
      role="button"
    >
      {StartIcon && StartIconPassed}
      {children && !onlyIcon && children}
      {EndIcon && EndIconPassed}
      {!onlyIcon && loader}
    </button>
  );
};

export default Button;
