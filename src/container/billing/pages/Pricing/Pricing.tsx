import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";

import Flex from "@/components/Flex";
import Tabs from "@/components/Tabs/Tabs";
import PlanCard from "@/components/PlanCard/PlanCard";
import Container from "@/components/Container/Container";

import {
  yearlyPlans,
  PlansTitles,
  monthlyPlans,
  planDefaultValues,
  PlanDefaultValuesTypes,
  addOnInfoTypes,
} from "@/constant/plans";

import Grid from "@/components/Grid/Grid";

import "./Pricing.scss";
import { EXACT_ROUTES } from "@/constant/routes";

const { CHECKOUT } = EXACT_ROUTES;

const Pricing = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    defaultValues: planDefaultValues as PlanDefaultValuesTypes,
  });

  const values = useWatch({ control });

  const totalAmount = (
    planType: PlansTitles,
    amount: number,
    addOnInfo: addOnInfoTypes[],
  ) => {
    return (
      ((values[planType]?.extra_sites || 0) / addOnInfo[0].step) *
        addOnInfo[0].amount +
      ((values[planType]?.extra_keywords || 0) / addOnInfo[1].step) *
        addOnInfo[1].amount +
      ((values[planType]?.extra_pages || 0) / addOnInfo[2].step) *
        addOnInfo[2].amount +
      amount
    );
  };

  const formPayload = (values: PlanDefaultValuesTypes) => {
    navigate(CHECKOUT);
    console.log(values[values.selectedPlan], values.selectedPlan);
  };

  const submitForm = () => {
    handleSubmit(formPayload)();
  };

  return (
    <Container className="plans-cards">
      <Tabs
        variant="outlined"
        activeColor="info"
        tabColor="secondary"
        className="pricing-tabs"
        tabs={[
          {
            title: "Monthly",
            content: (
              <Container className="plan-card-container">
                <Flex gap={16} justify="center" className="plan-card-flex">
                  <Grid>
                    {monthlyPlans.map((item, index) => (
                      <PlanCard
                        key={`${index}PlanCard`}
                        duration="Monthly"
                        amount={totalAmount(
                          item.planType,
                          item.amount,
                          item.addOnInfo,
                        )}
                        Icon={item.Icon}
                        color={item.color}
                        type={item.type}
                        description={item.description}
                        generalInfo={item.generalInfo}
                        detailsInfo={item.detailsInfo}
                        isAPIAccess={item.isAPIAccess}
                        crawlSchedule={item.crawlSchedule}
                        addOnInfo={item.addOnInfo}
                        control={control}
                        handleSubmit={submitForm}
                        buttonText={item.buttonText}
                        buttonColor={item.buttonColor}
                        planType={item.planType}
                      />
                    ))}
                  </Grid>
                </Flex>
              </Container>
            ),
          },
          {
            title: "Annual",
            content: (
              <Container className="plan-card-container">
                <Flex gap={16} justify="center" className="plan-card-flex">
                  <Grid>
                    {yearlyPlans.map((item, index) => (
                      <PlanCard
                        key={`${index}PlanCard`}
                        duration="Year"
                        amount={totalAmount(
                          item.planType,
                          item.amount,
                          item.addOnInfo,
                        )}
                        Icon={item.Icon}
                        color={item.color}
                        type={item.type}
                        description={item.description}
                        generalInfo={item.generalInfo}
                        detailsInfo={item.detailsInfo}
                        isAPIAccess={item.isAPIAccess}
                        crawlSchedule={item.crawlSchedule}
                        addOnInfo={item.addOnInfo}
                        control={control}
                        handleSubmit={submitForm}
                        buttonText={item.buttonText}
                        buttonColor={item.buttonColor}
                        planType={item.planType}
                      />
                    ))}
                  </Grid>
                </Flex>
              </Container>
            ),
          },
        ]}
      />
    </Container>
  );
};

export default Pricing;
