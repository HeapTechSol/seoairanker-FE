import { ColorsTypes, SizeTypes } from "@/utils/commonTypes";
import { classMapper } from "@/utils/helper";

import "./RangeSelector.scss";

const RangeSelector = ({
  onChange,
  min = 0,
  max = 100,
  step = 10,
  value = 0,
  size = "md",
  isInfoChip = true,
  thumbColor = "primary",
  rangeColor = "primary",
}: {
  onChange?: (value: React.ChangeEvent) => void;
  min?: number;
  step?: number;
  max?: number;
  value?: number;
  size?: SizeTypes;
  isInfoChip?: boolean;
  thumbColor?: ColorsTypes;
  rangeColor?: ColorsTypes;
}) => {
  const sliderCSSClasses = classMapper("slider", {
    [`thumb-color-${thumbColor}`]: thumbColor,
    [`range-color-${rangeColor}`]: rangeColor,
    [size]: size,
  });

  const rangeSelectorCSSClasses = classMapper("range-selector", {
    [thumbColor]: thumbColor,
  });

  const percentage = (value / max) * 100;

  // const selectedRange = ((value - min) / (max - min)) * 100;

  return (
    <div
      className={rangeSelectorCSSClasses}
      style={{ paddingTop: isInfoChip ? "40px" : "" }}
    >
      {isInfoChip && (
        <span
          style={{
            left: `calc(${percentage}% - ${percentage / 4}px)`,
          }}
          id="counterOutput"
        >
          {value}
        </span>
      )}
      <input
        className={sliderCSSClasses}
        id="myRange"
        value={value}
        max={max}
        min={min}
        step={step}
        type="range"
        onChange={onChange}
        // style={{background:`linear-gradient(to right, green 0%, green ${selectedRange}%, #DEE2E6 ${selectedRange}%, #DEE2E6 100%)`}}
      />
    </div>
  );
};

export default RangeSelector;
