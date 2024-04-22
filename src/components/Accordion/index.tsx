import { useRef } from "react";

import { classMapper } from "@/utils/helper";

import { AccordionTypes } from "./types";

import "./Accordion.scss";

const Accordion = ({
  description,
  title,
  color = "primary",
  arrowIcon = false,
  onTitleClick = false,
  CustomIcon,
}: AccordionTypes) => {
  const accordionRef = useRef<HTMLDivElement>(null);

  const clickHandler = () => {
    if (accordionRef.current) accordionRef.current.classList.toggle("open");
  };

  const classes = classMapper("accordion-container", {
    [color]: color,
    onTitleClick: onTitleClick,
  });

  return (
    <div className={classes} ref={accordionRef}>
      <div
        className="accordion-container-header"
        onClick={clickHandler}
      >
        <div
          className="header-title"
        >
          {title}
        </div>
        {CustomIcon && CustomIcon}
        {arrowIcon && !CustomIcon && <div className="header-icon"></div>}
      </div>
      <div className="accordion-container-description">{description}</div>
    </div>
  );
};

export default Accordion;
