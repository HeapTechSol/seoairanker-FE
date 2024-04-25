import { classMapper } from "@/utils/helper";
import { ColorsTypes } from "@/utils/commonTypes";

import "./Divider.scss";

const Divider = ({
  color = "warning",
  margin = 0,
}: {
  color?: ColorsTypes;
  margin?: number;
}) => {
  const dividerCSSClasses = classMapper("divider", {
    [color]: color,
  });

  const dividerStyle = { marginTop: margin, marginBottom: margin };
  return <div className={dividerCSSClasses} style={dividerStyle}></div>;
};

export default Divider;
