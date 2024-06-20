import React from "react";

type TypographyType<T extends HTMLElement> = {
  type: string;
  onClick?: (e: React.SyntheticEvent) => void;
  onBlur?: (e: React.FocusEvent<T>) => void;
  text: string | JSX.Element | React.ReactNode;
  typographyCSSClasses: string;
  contentEditable?: boolean;
  ref?: React.Ref<T>;
};

const renderElement = <T extends HTMLElement>(
  Element: React.ElementType,
  {
    onClick,
    onBlur,
    typographyCSSClasses,
    contentEditable,
    ref,
    text,
  }: Omit<TypographyType<T>, "type">
) => (
  <Element
    onClick={onClick}
    onBlur={onBlur}
    className={typographyCSSClasses}
    contentEditable={contentEditable}
    suppressContentEditableWarning={true}
    ref={ref}
  >
    {text}
  </Element>
);

const element = <T extends HTMLElement>({
  type,
  ...props
}: TypographyType<T>) => {
  const elementsMap: { [key: string]: React.ElementType } = {
    "body-text": "div",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
  };

  const Element = elementsMap[type];
  return Element ? renderElement(Element, props) : null;
};

export default element;