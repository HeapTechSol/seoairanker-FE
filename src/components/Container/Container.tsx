import { classMapper } from "@/utils/helper";

import { ColorsTypes } from "@/utils/commonTypes";

import "./Container.scss";

type ContainerTypes = {
  className?: string;
  boxShadow?: boolean;
  color?: ColorsTypes;
  fullHeight?: boolean;
  transparent?: boolean;
  borderRadius?: boolean;
  width?: "auto" | number;
  contentCenter?: boolean;
  padding?: number | string;
  maxWidth?: "auto" | number;
  children: React.ReactNode | JSX.Element;
};

const Container = ({
  padding,
  children,
  className = "",
  width = "auto",
  boxShadow = false,
  maxWidth = "auto",
  color = "common",
  transparent = false,
  borderRadius = false,
  contentCenter = false,
  fullHeight = false,
}: ContainerTypes) => {
  const containerCSSClasses = classMapper("container", {
    fullHeight: fullHeight,
    contentCenter: contentCenter,
    [color]: color,
    boxShadow: boxShadow,
    transparent: transparent,
    [className]: className,
    borderRadius: borderRadius,
  });

  const containerStyles = {
    maxWidth: maxWidth === "auto" ? "100%" : `${maxWidth}%`,
    width: width === "auto" ? width : `${width}%`,
    padding: padding ?? undefined,
  };

  return (
    <div className={containerCSSClasses} style={containerStyles}>
      {children}
    </div>
  );
};

export default Container;
