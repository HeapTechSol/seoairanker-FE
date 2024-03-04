import { classMapper } from "@/utils/helper";
import { FlexPropsTypes } from "./types";

import "./Flex.scss";

const Flex = ({
  vertical = false,
  gap = 0,
  rowReverse = false,
  columnReverse = false,
  justify,
  align,
  children,
  className,
  onClick,
}: FlexPropsTypes) => {
  const flexClasses = classMapper(`flex-container ${className}`, {
    vertical: vertical,
    rowReverse: rowReverse && !vertical,
    columnReverse: columnReverse && !rowReverse,
    [`justify-${justify}`]: justify,
    [`align-${align}`]: align,
  });

  const inlineStyle = gap ? { gap: `${gap}px` } : {};

  return (
    <div style={inlineStyle} className={flexClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export default Flex;
