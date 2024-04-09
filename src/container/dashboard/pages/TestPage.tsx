import PlanCard from "@/components/PlanCard/PlanCard";
import Flex from "@/components/Flex";

import { EnterpriseIcon, AgencyIcon, PersonIcon } from "@/assets/icons/svgs";
// import RangeSelector from "@/components/RangeSelector/RangeSelector";
// import { useState } from "react";

const TestPage = () => {
  // const [value, setValue] = useState<number>(0)
  return (
    <Flex gap={16} wrap justify="center">
      <PlanCard
        amount="299"
        Icon={PersonIcon}
        color="warning"
        type="Business"
        description="For consultants, startups, and small teams."
      />
      <PlanCard
        amount="599"
        Icon={AgencyIcon}
        color="primary"
        type="Agency"
        description="For agencies, e-comm stores, and other businesses."
      />
      <PlanCard
        amount="1,199"
        Icon={EnterpriseIcon}
        color="info"
        type="Enterprise"
        description="For corporations, agencies, online retailers, tech hubs, etc."
      />
      {/* <RangeSelector value={value} onChange={(e)=>setValue(e.target.value)} size="lg"/> */}
    </Flex>
  );
};

export default TestPage;
