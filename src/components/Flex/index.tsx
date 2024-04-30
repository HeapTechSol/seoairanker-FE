import React from "react";

import { classMapper } from "@/utils/helper";

import { FlexPropsTypes } from "./types";

import "./Flex.scss";

const Flex = React.forwardRef<HTMLDivElement, FlexPropsTypes>((props, ref) => {
  const {
    vertical = false,
    gap = 0,
    padding = 0,
    rowReverse = false,
    columnReverse = false,
    justify,
    align,
    children,
    className,
    wrap = false,
    onClick,
  } = props;
  const flexClasses = classMapper(`flex-container`, {
    [className || ""]: !!className,
    vertical: vertical,
    rowReverse: rowReverse && !vertical,
    columnReverse: columnReverse && !rowReverse,
    [`justify-${justify}`]: justify,
    [`align-${align}`]: align,
    wrap: wrap,
  });

  const contentGap = !!gap && { gap: `${gap}px` };
  const flexPadding = { padding: padding ? padding : undefined };

  const inlineStyle = { ...contentGap, ...flexPadding };

  return (
    <div
      style={inlineStyle}
      className={flexClasses}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </div>
  );
});

export default Flex;
