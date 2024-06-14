import { classMapper } from "@/utils/helper";
import { ColorsTypes } from "@/utils/commonTypes";

import "./HorizontalProgressBar.scss";

const HorizontalProgressBar = ({
  max = 100,
  value = 50,
  color = "primary",
}: {
  max: number;
  value: number;
  color?: ColorsTypes;
}) => {

  const progressContainerCSSClasses = classMapper("progress-section", {
    [color]: color,
  });

  return (
    <div
      className={progressContainerCSSClasses}
      data-aos="fade-left"
      data-aos-once="true"
    >
      <progress
        className="progress progress3"
        max={max}
        value={value}
      ></progress>
    </div>
  );
};

export default HorizontalProgressBar;
