import { classMapper } from "@/utils/helper";

import { ColorsTypes } from "@/utils/commonTypes";

import { element } from "@/utils/typographyTypeHandler";

import "./Typography.scss";

type Props = {
  text: string | JSX.Element | React.ReactNode;
  link?: boolean;
  color?: ColorsTypes;
  onClick?: () => void;
  size?: "large" | "medium" | "small";
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body-text";
};

const Typography = ({
  text,
  size,
  link,
  onClick,
  type = "body-text",
  color = "common",
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
    [`${elementType[type]}--${size}`]: size,
    [color]: color,
    link: link,
  });

  return <>{element({ type, typographyCSSClasses, onClick, text })}</>;
};

export default Typography;
