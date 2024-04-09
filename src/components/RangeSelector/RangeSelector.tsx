import { ColorsTypes, SizeTypes } from "@/utils/commonTypes";
import { classMapper } from "@/utils/helper";
import "./RangeSelector.scss";

const RangeSelector = ({
  onChange,
  min = 0,
  max = 100,
  value = 0,
  size = "md",
  thumbColor = "primary",
  rangeColor = "primary",
}: {
  onChange?: (value: React.ChangeEvent) => void;
  min?: number;
  max?: number;
  value?: number;
  size?: SizeTypes;
  thumbColor?: ColorsTypes;
  rangeColor?: ColorsTypes;
}) => {
  const sliderCSSClasses = classMapper("slider", {
    [`thumb-color-${thumbColor}`]: thumbColor,
    [`range-color-${rangeColor}`]: rangeColor,
    [size]: size,
  });
  return (
    <input
      className={sliderCSSClasses}
      id="myRange"
      value={value}
      max={max}
      min={min}
      type="range"
      onChange={onChange}
    />
  );
};

export default RangeSelector;
