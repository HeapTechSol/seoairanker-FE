import { Control, Controller } from "react-hook-form";

import Flex from "../Flex";
import Button from "../Button";
import RadioButton from "../RadioButton";
import Divider from "../Divider/Divider";
import Container from "../Container/Container";
import Typography from "../Typography/Typography";
import RangeSelector from "../RangeSelector/RangeSelector";

import {
  PlanDefaultValuesTypes,
  PlanTypes,
  strongTextGenerator,
} from "@/constant/plans";

import { currencyConverter } from "@/utils/helper";

import "./PlanCard.scss";

export type PlanCard = PlanTypes & {
  control: Control<PlanDefaultValuesTypes>;
  handleSubmit: () => void;
  duration: "Monthly" | "Year";
};

const PlanCard = ({
  type = "",
  description = "",
  color = "primary",
  buttonColor = "primary",
  Icon,
  amount,
  addOnInfo,
  generalInfo,
  detailsInfo,
  isAPIAccess,
  crawlSchedule,
  buttonText = "",
  planType = "basic",
  control,
  duration = "Monthly",
  handleSubmit,
}: PlanCard) => {
  return (
    <Container boxShadow borderRadius padding={40} className="plan-card">
      <Flex vertical gap={20}>
        <Flex gap={20} justify="between" align="center">
          <Typography color={color} type="h1" size="lg" text={type} />
          {Icon}
        </Flex>
        <Typography size="lg" textAlign="left" text={description} />
      </Flex>
      <Divider color="warning" margin={30} />
      <Flex gap={20} vertical>
        <Flex gap={4}>
          <Typography
            type="h1"
            size="lg"
            text={`$${currencyConverter(amount)}`}
          />
          <sup>/ {duration}</sup>
        </Flex>
        <Flex vertical gap={8}>
          {generalInfo.map((item, index) => (
            <RadioButton
              readOnly
              size="lg"
              checked
              label={`${item.amount} ${item.text}`}
              labelPosition="right"
              key={`${index}generalInfo`}
            />
          ))}
        </Flex>
      </Flex>
      <Divider color="warning" margin={30} />
      <Flex vertical gap={8}>
        {detailsInfo.map((item, index) => (
          <RadioButton
            readOnly
            size="lg"
            checked
            label={
              <>
                {strongTextGenerator(currencyConverter(item.amount)) || ""}{" "}
                {item.text}
              </>
            }
            labelPosition="right"
            key={`${index}detailsInfo`}
          />
        ))}
      </Flex>
      <Divider color="warning" margin={30} />
      <Flex vertical gap={8}>
        <RadioButton
          readOnly
          checked
          size="lg"
          restricted
          color={isAPIAccess ? "primary" : "error"}
          label={`API Access`}
          labelPosition="right"
        />
        <RadioButton
          readOnly
          checked
          size="lg"
          label={`${crawlSchedule} Crawl Interval`}
          labelPosition="right"
        />
      </Flex>
      <Divider color="warning" margin={30} />
      <Flex vertical gap={32}>
        {addOnInfo?.map((item, index) => (
          <Flex vertical gap={12} key={`${index}addOnInfo`}>
            <RadioButton
              readOnly
              checked
              size="lg"
              label={item.text}
              labelPosition="right"
            />

            <Controller
              name={`${planType}.${item.key}`}
              render={({ field: { onChange, value } }) => {
                return (
                  <RangeSelector
                    value={value}
                    onChange={(e) =>
                      onChange((e.target as HTMLInputElement).value)
                    }
                    size="sm"
                    thumbColor="common"
                    max={item.max}
                    min={0}
                    step={item.step}
                  />
                );
              }}
              control={control}
            />
          </Flex>
        ))}
      </Flex>
      <Controller
        name={"selectedPlan"}
        render={({ field: { onChange } }) => {
          return (
            <Button
              size="lg"
              fullWidth
              type="borderRadius"
              color={buttonColor}
              onClick={() => {
                onChange(planType);
                handleSubmit();
              }}
            >
              {buttonText}
            </Button>
          );
        }}
        control={control}
      />
    </Container>
  );
};

export default PlanCard;
