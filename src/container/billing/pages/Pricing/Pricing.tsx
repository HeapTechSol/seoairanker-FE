import { useNavigate } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'

import Flex from '@/components/Flex'
import Tabs from '@/components/Tabs/Tabs'
import Grid from '@/components/Grid/Grid'
import PlanCard from '@/components/PlanCard/PlanCard'
import Container from '@/components/Container/Container'

import { yearlyPlans, PlansTitles, monthlyPlans, planDefaultValues, PlanDefaultValuesTypes, addOnInfoTypes } from '@/constant/plans'

import { EXACT_ROUTES } from '@/constant/routes'

import './Pricing.scss'

const { CHECKOUT } = EXACT_ROUTES

const Pricing = () => {
  const navigate = useNavigate()
  const { control, setValue, handleSubmit } = useForm({
    defaultValues: planDefaultValues as PlanDefaultValuesTypes,
  })

  const values = useWatch({ control })

  const totalAmount = (planType: PlansTitles, amount: number, addOnInfo: addOnInfoTypes[]) => {
    const totalAmount =
      ((values[planType]?.extra_sites || 0) / addOnInfo[0].step) * addOnInfo[0].amount +
      ((values[planType]?.extra_keywords || 0) / addOnInfo[1].step) * addOnInfo[1].amount +
      ((values[planType]?.extra_pages || 0) / addOnInfo[2].step) * addOnInfo[2].amount +
      amount

    return totalAmount
  }

  const pricesIds = {
    business: {
      id: 'price_1PUsWGKhs45SIh5yuS25cc29',
      extra_pages: 'price_1PVTrzKhs45SIh5yI4Cvzl6t',
      extra_sites: 'price_1PVTqNKhs45SIh5yCGNmCoHH',
      extra_keywords: 'price_1PVTrFKhs45SIh5yjBEJk7DG',
    }
  }

  const handleCheckoutPage = (data: PlanDefaultValuesTypes) => {
    const addOns = data[data.selectedPlan]
    const prices_keys = pricesIds[data.selectedPlan as keyof typeof pricesIds]
    const addonsData = data.selectedPlanData.addOnsData
    const filterAddons = addonsData.filter((item) => addOns[item.key as keyof typeof addOns])
    const modifiedAddOns = filterAddons.map((item) => ({
      ...item,
      amount: item.amount * (addOns[item.key as keyof typeof addOns] / item.step),
      quantity: addOns[item.key as keyof typeof addOns],
      plan_id: prices_keys[item.key as keyof typeof addOns],
    }))

    navigate(CHECKOUT, {
      state: { plan_type: data.selectedPlan, pricing_id: prices_keys.id, planId:data.planId, addOns: modifiedAddOns, amount: data.selectedPlanData.planAmount },
    })
  }

  const submitForm = () => {
    handleSubmit(handleCheckoutPage)()
  }

  return (
    <Container className="plans-cards">
      <Tabs
        variant="text"
        activeColor="info"
        tabColor="primary"
        // className="pricing-tabs"
        tabsPlacement='left'
        tabs={[
          {
            title: 'Monthly',
            content: (
              <Container className="plan-card-container">
                <Flex gap={16} justify="center" className="plan-card-flex">
                  <Grid>
                    {monthlyPlans.map((item, index) => (
                      <PlanCard
                        key={`${index}PlanCard`}
                        duration="Monthly"
                        amount={totalAmount(item.planType, item.amount, item.addOnInfo)}
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
                        itemAmount={item.amount}
                        planId={item.planId}
                        loading={false}
                      />
                    ))}
                  </Grid>
                </Flex>
              </Container>
            ),
          },
          {
            title: 'Annual',
            content: (
              <Container className="plan-card-container">
                <Flex gap={16} justify="center" className="plan-card-flex">
                  <Grid>
                    {yearlyPlans.map((item, index) => (
                      <PlanCard
                        key={`${index}PlanCard`}
                        duration="Year"
                        amount={totalAmount(item.planType, item.amount, item.addOnInfo)}
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
                        itemAmount={item.amount}
                        planId={item.planId}

                        loading={false}
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
  )
}

export default Pricing
