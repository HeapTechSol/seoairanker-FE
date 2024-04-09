import React, { useState } from "react";

import Button from "../Button";

import "./Tabs.scss";
import { classMapper } from "@/utils/helper";
import { ColorsTypes, SizeTypes } from "@/utils/commonTypes";

interface Tab {
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  size?: SizeTypes;
  bottomBordered?: boolean;
  tabColor?: ColorsTypes;
  activeColor?: ColorsTypes;
  defaultActiveTab?: number;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  bottomBordered = false,
  size = "md",
  tabColor = "primary",
  activeColor = "primary",
  defaultActiveTab = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveTab);

  const tabsCSSClasses = classMapper("tabs", {
    bottomBordered: bottomBordered,
    [activeColor]: activeColor,
  });

  const buttonCSSClasses = (index: number) =>
    classMapper("btn", {
      active: index === activeIndex,
    });

  return (
    <div className={tabsCSSClasses}>
      <div className={"tabButtons"}>
        {tabs.map((tab, index) => (
          <Button
            size={size}
            key={index}
            color={tabColor}
            variant="text"
            type="borderRadius"
            className={buttonCSSClasses(index)}
            onClick={() => setActiveIndex(index)}
          >
            {tab.title}
          </Button>
        ))}
      </div>
      <div className={"tabContent"}>{tabs[activeIndex].content}</div>
    </div>
  );
};

export default Tabs;
