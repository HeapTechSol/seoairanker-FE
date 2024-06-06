import React, { useState } from "react";

import Button from "../Button";

import { classMapper } from "@/utils/helper";

import { ColorsTypes, SizeTypes } from "@/utils/commonTypes";

import "./Tabs.scss";

type Tab = {
  title: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  size?: SizeTypes;
  className?: string;
  tabColor?: ColorsTypes;
  bottomBordered?: boolean;
  activeColor?: ColorsTypes;
  defaultActiveTab?: number;
  variant?: "outlined" | "text";
  tabsPlacement?: "center" | "left" | "right";
  contentPlacement?: "center" | "left" | "right";
};

const Tabs = ({
  tabs,
  size = "md",
  className = "",
  variant = "text",
  tabColor = "primary",
  defaultActiveTab = 0,
  bottomBordered = false,
  activeColor = "primary",
  tabsPlacement = "center",
  contentPlacement = "center",
}: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveTab);

  const tabsCSSClasses = classMapper("tabs", {
    bottomBordered: bottomBordered,
    [activeColor]: activeColor,
    [tabsPlacement]: tabsPlacement,
  });

  const buttonCSSClasses = (index: number) =>
    classMapper("btn tabs-button", {
      active: index === activeIndex,
    });

  const tabsButtonContainerCSSClasses = classMapper("tabButtons", {
    [className]: className,
  });

  const tabsContentCSSClasses = classMapper("tabContent", {
    [contentPlacement]: contentPlacement,
  });

  return (
    <div className={tabsCSSClasses}>
      <div className={tabsButtonContainerCSSClasses}>
        {tabs.map((tab, index) => (
          <Button
            size={size}
            key={index}
            color={tabColor}
            variant={variant}
            type="borderRadius"
            className={buttonCSSClasses(index)}
            onClick={() => setActiveIndex(index)}
          >
            {tab.title}
          </Button>
        ))}
      </div>
      <div className={tabsContentCSSClasses}>{tabs[activeIndex].content}</div>
    </div>
  );
};

export default Tabs;
