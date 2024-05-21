import { useState } from "react";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { useForm, useWatch } from "react-hook-form";

import Flex from "@/components/Flex";
import Tabs from "@/components/Tabs/Tabs";
import Grid from "@/components/Grid/Grid";
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

import useStripeHandling, { CheckoutPayload } from "@/container/billing/hooks/useStripeHandling";

import "./Pricing.scss";

const Pricing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const { control, setValue, handleSubmit } = useForm({
    defaultValues: planDefaultValues as PlanDefaultValuesTypes,
  });

  const values = useWatch({ control });

  const { handleCheckout } = useStripeHandling();

  const payNow = async (values: PlanDefaultValuesTypes) => {
    try {
      setIsLoading(true);
      setSelectedPlan(values.selectedPlan);
      const extraToping = values[values.selectedPlan];
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
      const body: CheckoutPayload = {
        interval: "month",
        plan_id: values.selectedPlan,
        plan_name: `${values.selectedPlan?.toLocaleUpperCase()} Plan`,
        base_price: values.totalAmount,
        additional_properties: Object.entries(extraToping)?.map(
          ([key, value]) => ({
            name: key,
            price: value,
          })
        ),
      };

      const response = await handleCheckout(body);
      setIsLoading(false);
      setSelectedPlan("");
      await stripe?.redirectToCheckout({
        sessionId: response?.data?.sessionId,
      });
    } catch (error) {
      setIsLoading(false);
      setSelectedPlan("");
      toast.error("Something went wrong to load stripe checkout");
    }
  };

  const totalAmount = (
    planType: PlansTitles,
    amount: number,
    addOnInfo: addOnInfoTypes[]
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

  const submitForm = () => {
    handleSubmit(payNow)();
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
                          item.addOnInfo
                        )}
                        setValue={setValue}
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
                        loading={isLoading && item.planType === selectedPlan}
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
                          item.addOnInfo
                        )}
                        setValue={setValue}
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
                        loading={isLoading}
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
