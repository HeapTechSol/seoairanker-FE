import { classMapper } from "@/utils/helper";

import "./Grid.scss";

const Grid = ({ children }: { children: JSX.Element | React.ReactNode }) => {
  const gridCSSClasses = classMapper("grid-container");
  return <div className={gridCSSClasses}>{children}</div>;
};

export default Grid;
