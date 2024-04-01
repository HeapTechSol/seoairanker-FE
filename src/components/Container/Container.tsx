import { classMapper } from "@/utils/helper";

import { ColorsTypes } from "@/utils/commonTypes";

import "./Container.scss";

type ContainerTypes = {
  center?: boolean;
  boxShadow?: boolean;
  color?: ColorsTypes;
  fullHeight?: boolean;
  transparent?: boolean;
  customClasses?: string;
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
  center = false,
  width = "auto",
  boxShadow = false,
  maxWidth = "auto",
  color = "primary",
  customClasses = "",
  transparent = false,
  borderRadius = false,
  contentCenter = false,
  fullHeight = false
}: ContainerTypes) => {
  const containerCSSClasses = classMapper("container", {
    fullHeight:fullHeight,
    center: center,
    contentCenter: contentCenter,
    [color]: color,
    boxShadow: boxShadow,
    transparent: transparent,
    [customClasses]: customClasses,
    borderRadius: borderRadius,
  });

  const containerStyles = {
    maxWidth: maxWidth === "auto" ? "100%" : `${maxWidth}%`,
    width: width === "auto" ? width : `${width}%`,
    padding: padding ?? undefined,
  };

  return (
    <>
      {center ? (
        <div className="centered-container">
          <div className={containerCSSClasses} style={containerStyles}>
            {children}
          </div>
        </div>
      ) : (
        <div className={containerCSSClasses} style={containerStyles}>
          {children}
        </div>
      )}
    </>
  );
};

export default Container;
