import React from "react";

import { classMapper } from "@/utils/helper";
import { ColorsTypes } from "@/utils/commonTypes";
import element from "@/utils/typographyTypeHandler";

import "./Typography.scss";

type Props<T extends HTMLElement> = {
  link?: boolean;
  color?: ColorsTypes;
  onClick?: (e: React.SyntheticEvent) => void;
  onBlur?: (e: React.FocusEvent<T>) => void;
  size?: "lg" | "md" | "sm";
  textAlign?: "left" | "center" | "right";
  text: string | JSX.Element | React.ReactNode;
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body-text";
  inline?: boolean;
  contentEditable?: boolean;
  ref?: React.Ref<T>;
};

const Typography = React.forwardRef(<T extends HTMLElement>(
  {
    text,
    link,
    onClick,
    onBlur,
    size = "md",
    color = "common",
    textAlign = "left",
    type = "body-text",
    inline = false,
    contentEditable = false,
  }: Props<T>,
  ref: React.Ref<T>
) => {
  const elementType = {
    "body-text": "body-text",
    h1: "heading-one",
    h2: "heading-two",
    h3: "heading-three",
    h4: "heading-four",
    h5: "heading-five",
    h6: "heading-six",
  };

  const typographyCSSClasses = classMapper(elementType[type], {
    link: link,
    [color]: color,
    [textAlign]: textAlign,
    [`${elementType[type]}--${size}`]: size,
    editAble:contentEditable,
    inline: inline,
  });

  return (
    <>
      {element({
        type,
        typographyCSSClasses,
        onClick,
        onBlur,
        text,
        ref,
        contentEditable,
      })}
    </>
  );
});

export default Typography;
