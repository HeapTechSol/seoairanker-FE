import { classMapper } from "@/utils/helper";
import { ColorsTypes, SizeTypes } from "@/utils/commonTypes";

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
  filledRangeColor = "primary",
  emptyRangeColor = "primary",
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
  filledRangeColor?: ColorsTypes;
  emptyRangeColor?: ColorsTypes;
}) => {
  const sliderCSSClasses = classMapper("slider", {
    [`thumb-color-${thumbColor}`]: thumbColor,
    [size]: size,
  });

  const rangeSelectorCSSClasses = classMapper("range-selector", {
    [thumbColor]: thumbColor,
  });

  const percentage = (value / max) * 100;

  const selectedRange = ((value - min) / (max - min)) * 100;

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
        style={{
          background: `linear-gradient(to right, var(--color-${filledRangeColor}-main) 0%, var(--color-${filledRangeColor}-main) ${selectedRange}%, var(--color-${emptyRangeColor}-light) ${selectedRange}%, var(--color-${emptyRangeColor}-light) 100%)`,
        }}
      />
    </div>
  );
};

export default RangeSelector;
