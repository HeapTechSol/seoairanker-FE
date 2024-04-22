import { classMapper } from "@/utils/helper";

import { ColorsTypes } from "@/utils/commonTypes";

import { element } from "@/utils/typographyTypeHandler";

import "./Typography.scss";

type Props = {
  link?: boolean;
  color?: ColorsTypes;
  onClick?: () => void;
  size?: "lg" | "md" | "sm";
  textAlign?: "left" | "center" | "right";
  text: string | JSX.Element | React.ReactNode;
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body-text";
  inline?:boolean
};

const Typography = ({
  text,
  link,
  onClick,
  size = "md",
  color = "common",
  textAlign = "left",
  type = "body-text",
  inline=false,
}: Props) => {
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
    inline:inline
  });

  return <>{element({ type, typographyCSSClasses, onClick, text })}</>;
};

export default Typography;
