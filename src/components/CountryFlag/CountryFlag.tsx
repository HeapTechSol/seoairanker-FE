import ReactFlagsSelect from "react-flags-select";

import Flex from "../Flex";

import { ColorsTypes } from "@/utils/commonTypes";

import { classMapper } from "@/utils/helper";

import "./CountryFlag.scss";

const CountryFlag = ({
  value,
  label = "",
  error = "",
  onChange,
  size = "md",
  color = "primary",
}: {
  label?: string;
  value: string;
  error?: string;
  color?: ColorsTypes;
  size?: "sm" | "md" | "lg";
  onChange: (val: string) => void;
}) => {
  const countrySelectClasses = classMapper("country-select", {
    size: size,
    [color]: color,
  });
  return (
    <Flex vertical gap={3} className={countrySelectClasses}>
      <Flex vertical gap={8}>
        {label && <label htmlFor={"country"}>{label}</label>}
        <ReactFlagsSelect
          id="country"
          selected={value}
          onSelect={(code) => onChange(code)}
        />
      </Flex>
      {error && <p className="error-text">{error}</p>}
    </Flex>
  );
};

export default CountryFlag;
