import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'

import Flex from '@/components/Flex'
import Tabs from '@/components/Tabs/Tabs'
import Grid from '@/components/Grid/Grid'
import Loader from '@/components/Loader'
import PlanCard from '@/components/PlanCard/PlanCard'
import Container from '@/components/Container/Container'

import { AgencyIcon, EnterpriseIcon, PersonIcon } from '@/assets/icons/svgs'

import {
  PlansTitles,
  planDefaultValues,
  PlanDefaultValuesTypes,
  displaySiteQuotaDetails,
  addsOnInfoGenerator,
  addsOnKeyTypes,
} from '@/constant/plans'

import { ColorsTypes } from '@/utils/commonTypes'
import { extraAddOns, PlanDataType } from '@/container/billing/billingTypes'

import useStripeHandling from '@/container/billing/hooks/useStripeHandling'

import { EXACT_ROUTES } from '@/constant/routes'

import './Pricing.scss'

const { CHECKOUT } = EXACT_ROUTES

const Pricing = () => {
  const navigate = useNavigate()
  const { allPlansList, plansLoading, getPlansList } = useStripeHandling()
  const { control, setValue, handleSubmit } = useForm({
    defaultValues: planDefaultValues as PlanDefaultValuesTypes,
  })

  const values = useWatch({ control })

  const totalAmount = (planType: PlansTitles, amount: number, addOnInfo: extraAddOns) => {
    const addOnsObject = values[planType as keyof typeof values] as addsOnKeyTypes
    const totalAmount =
      ((addOnsObject?.price_extra_sites || 0) / addOnInfo[0].step) * addOnInfo[0].value +
      ((addOnsObject?.price_extra_keywords || 0) / addOnInfo[1].step) * addOnInfo[1].value +
      ((addOnsObject?.price_extra_pages || 0) / addOnInfo[2].step) * addOnInfo[2].value +
      amount

    return totalAmount
  }

  const handleCheckoutPage = (data: PlanDefaultValuesTypes) => {
    const addOns = data[data.selectedPlan as keyof typeof data]
    const addonsData = data.selectedPlanData.addOnsData
    const filterAddons = addonsData?.filter((item) => addOns[item.key as keyof typeof addOns])
    const modifiedAddOns = filterAddons?.map((item) => ({
      ...item,
      amount: item.amount * (addOns[item.key as keyof typeof addOns] / item.step),
      quantity: addOns[item.key as keyof typeof addOns],
      plan_id: item.stripe_price_id,
    }))

    navigate(CHECKOUT, {
      state: {
        plan_type: data.selectedPlan,
        pricing_id: data.selectedPlanData.stripe_price_id,
        planId: data.planId,
        addOns: modifiedAddOns,
        amount: data.selectedPlanData.planAmount,
      },
    })
  }

  const submitForm = () => {
    handleSubmit(handleCheckoutPage)()
  }

  const BUTTON_TEXT = {
    Basic: 'Get Started',
    Enterprise: 'Get Started',
    Agency: 'Get Started',
    'Basic Annual': 'Get Started',
    'Agency Annual': 'Get Started',
    'Enterprise Annual': 'Get Started',
  }

  const COLORS = {
    Basic: 'warning',
    Enterprise: 'primary',
    Agency: 'info',
    'Basic Annual': 'warning',
    'Agency Annual': 'primary',
    'Enterprise Annual': 'info',
  }

  const ICONS = {
    Basic: AgencyIcon,
    Enterprise: EnterpriseIcon,
    Agency: PersonIcon,
    'Basic Annual': AgencyIcon,
    'Agency Annual': EnterpriseIcon,
    'Enterprise Annual': PersonIcon,
  }

  const displaySiteQuota = (plan: PlanDataType) => {
    return [
      { amount: plan?.sites_quota || 0, text: 'Sites' },
      { amount: plan?.pages_quota || 0, text: 'Pages' },
      { amount: plan?.keywords_quota || 0, text: 'Keywords' },
      { amount: plan?.team_members_quota || 0, text: 'Team Members' },
    ]
  }

  useEffect(() => {
    getPlansList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container className="plans-cards">
      <Loader loading={plansLoading} />
      <Tabs
        activeByUrl={false}
        variant="text"
        activeColor="info"
        tabColor="primary"
        // className="pricing-tabs"
        tabsPlacement="left"
        tabs={[
          {
            title: 'Monthly',
            content: (
              <Container className="plan-card-container">
                <Flex gap={16} justify="center" className="plan-card-flex">
                  <Grid>
                    {allPlansList?.data?.monthly?.map((item, index) => (
                      <PlanCard
                        key={`${index}PlanCard`}
                        duration="Monthly"
                        amount={totalAmount(item.name, item.base_price, item?.extra_addons)}
                        setValue={setValue}
                        Icon={ICONS[item?.name as keyof typeof ICONS]}
                        color={COLORS[item?.name as keyof typeof ICONS] as ColorsTypes}
                        type={item.name}
                        description={item.description}
                        generalInfo={displaySiteQuota(item)}
                        detailsInfo={displaySiteQuotaDetails(item)}
                        isAPIAccess={item.api_access}
                        crawlSchedule={item.crawl_interval}
                        addOnInfo={addsOnInfoGenerator(item)}
                        control={control}
                        handleSubmit={submitForm}
                        buttonText={BUTTON_TEXT[item?.name as keyof typeof ICONS]}
                        buttonColor={COLORS[item?.name as keyof typeof ICONS] as ColorsTypes}
                        planType={item.name}
                        itemAmount={item.base_price}
                        planId={item.id}
                        loading={false}
                        stripe_price_id={item.stripe_price_id}
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
                    {allPlansList?.data?.annually?.map((item, index) => (
                      <PlanCard
                        key={`${index}PlanCard`}
                        duration="Year"
                        amount={totalAmount(item.name, item.base_price, item?.extra_addons)}
                        setValue={setValue}
                        Icon={ICONS[item?.name as keyof typeof ICONS]}
                        color={COLORS[item?.name as keyof typeof ICONS] as ColorsTypes}
                        type={item.name}
                        description={item.description}
                        generalInfo={displaySiteQuota(item)}
                        detailsInfo={displaySiteQuotaDetails(item)}
                        isAPIAccess={item.api_access}
                        crawlSchedule={item.crawl_interval}
                        addOnInfo={addsOnInfoGenerator(item)}
                        control={control}
                        handleSubmit={submitForm}
                        buttonText={BUTTON_TEXT[item?.name as keyof typeof ICONS]}
                        buttonColor={COLORS[item?.name as keyof typeof ICONS] as ColorsTypes}
                        planType={item.name}
                        itemAmount={item.base_price}
                        planId={item.id}
                        loading={false}
                        stripe_price_id={item.stripe_price_id}
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
