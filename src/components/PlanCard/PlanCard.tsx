import Flex from "../Flex";
import Button from "../Button";
import RadioButton from "../RadioButton";
import Divider from "../Divider/Divider";
import Container from "../Container/Container";
import Typography from "../Typography/Typography";

import "./PlanCard.scss";
import { ColorsTypes } from "@/utils/commonTypes";

const PlanCard = ({
  type = "",
  description = "",
  color="primary",
  Icon,
  amount,
  sites,
  teamMembers,
  keywords,
  page,
  metaDescriptions,
  metaTitles,
  keywordsRanking,
  crawalPages,
  isAPIAccess,
  crawalSchedule
  
}: {
  type: string;
  color:ColorsTypes,
  description: string;
  Icon:string | JSX.Element
  amount:string
}) => {
  return (
    <Container boxShadow borderRadius padding={40} className="plan-card">
      <Flex vertical gap={20}>
        <Flex gap={20} justify="between" align="center">
          <Typography color={color} type="h1" size="lg" text={type} />
          <Button
            size="lg"
            onlyIcon
            color={color}
            type="borderRadius"
            StartIcon={Icon}
          />
        </Flex>
        <Typography size="lg" textAlign="left" text={description} />
      </Flex>
      <Divider color="warning" margin={30} />
      <Flex gap={20} vertical>
        <Flex gap={4}>
          <Typography type="h1" size="lg" text={`$${amount}`} />
          <sup>/ Month</sup>
        </Flex>
        <Flex vertical gap={8}>
          <RadioButton
            size="sm"
            checked
            label="5 Sites"
            labelPosition="right"
          />
          <RadioButton
            size="sm"
            checked
            label="5 Team Members"
            labelPosition="right"
          />
          <RadioButton
            size="sm"
            checked
            label="500 Keywords"
            labelPosition="right"
          />
          <RadioButton
            size="sm"
            checked
            label="1,250 Pages"
            labelPosition="right"
          />
        </Flex>
      </Flex>
      <Divider color="warning" margin={30} />
      <Flex vertical gap={8}>
        <RadioButton
          size="sm"
          checked
          label="AI JSON-LD Schemas for $0.02 per schema"
          labelPosition="right"
        />
        <RadioButton
          size="sm"
          checked
          label={'500 AI Meta Descriptions included, then $0.01 per descriptio'}
          labelPosition="right"
        />
        <RadioButton
          size="sm"
          checked
          label="500 AI Meta Titles included, then $0.01 per title"
          labelPosition="right"
        />
        <RadioButton
          size="sm"
          checked
          label="2,500 Keyword Rankings Updates included, then $0.01 per update"
          labelPosition="right"
        />
        <RadioButton
          size="sm"
          checked
          label="7,500 Page Crawls included, then $0.01 per crawl"
          labelPosition="right"
        />
      </Flex>
      <Divider color="warning" margin={30} />
      <Flex vertical gap={8}>
        <RadioButton
          checked
          size="sm"
          restricted
          color="error"
          label="API Access"
          labelPosition="right"
        />
        <RadioButton
          checked
          size="sm"
          label="Weekly Crawl Interval"
          labelPosition="right"
        />
      </Flex>
    </Container>
  );
};

export default PlanCard;
