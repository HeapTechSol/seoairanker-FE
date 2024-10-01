import { Control, Controller, UseFormSetValue } from 'react-hook-form'

import Flex from '../Flex'
import Button from '../Button'
import RadioButton from '../RadioButton'
import Divider from '../Divider/Divider'
import Container from '../Container/Container'
import Typography from '../Typography/Typography'
import RangeSelector from '../RangeSelector/RangeSelector'

import { PlanDefaultValuesTypes, PlanTypes, strongTextGenerator } from '@/constant/plans'

import { currencyConverter } from '@/utils/helper'

import './PlanCard.scss'

export type PlanCard = PlanTypes & {
  control: Control<PlanDefaultValuesTypes>
  setValue: UseFormSetValue<PlanDefaultValuesTypes>
  handleSubmit: () => void
  duration: 'Monthly' | 'Year'
  loading: boolean
  itemAmount: number
  planId: string
}

const PlanCard = ({
  type = '',
  description = '',
  color = 'primary',
  buttonColor = 'primary',
  Icon,
  amount,
  addOnInfo,
  generalInfo,
  detailsInfo,
  isAPIAccess,
  crawlSchedule,
  buttonText = '',
  planType = 'Basic',
  control,
  setValue,
  itemAmount,
  loading = false,
  duration = 'Monthly',
  handleSubmit,
  planId,
  stripe_price_id,
}: PlanCard) => {
  return (
    <Container boxShadow padding={40} className="plan-card  container-bg">
      <Flex vertical gap={20}>
        <Flex gap={20} justify="between" align="center">
          <Typography color={color} type="h1" size="lg" text={type} />
          {Icon}
        </Flex>
        <Typography size="lg" textAlign="left" text={description} />
      </Flex>
      <Divider color="primary" margin={30} />
      <Flex gap={20} vertical>
        <Flex gap={4}>
          <Typography type="h2" size="lg" text={`$${currencyConverter(amount)}`} />
          <sup>
            / <Typography text={duration} inline />
          </sup>
        </Flex>
        <Flex vertical gap={8}>
          {generalInfo?.map((item, index) => (
            <RadioButton
              readOnly
              size="lg"
              checked
              label={<Typography text={`${item.amount} ${item.text}`} />}
              labelPosition="right"
              key={`${index}generalInfo`}
            />
          ))}
        </Flex>
      </Flex>
      <Divider color="primary" margin={30} />
      <Flex vertical gap={8}>
        {detailsInfo?.map((item, index) => (
          <RadioButton
            readOnly
            size="lg"
            checked
            label={
              <Typography
                text={
                  <>
                    {strongTextGenerator(currencyConverter(item.amount))} ${item.text}
                  </>
                }
              />
            }
            labelPosition="right"
            key={`${index}detailsInfo`}
          />
        ))}
      </Flex>
      <Divider color="primary" margin={30} />
      <Flex vertical gap={8}>
        <RadioButton
          readOnly
          checked
          size="lg"
          restricted
          color={isAPIAccess ? 'primary' : 'error'}
          label={<Typography text={`API Access`} />}
          labelPosition="right"
        />
        <RadioButton readOnly checked size="lg" label={<Typography text={`${crawlSchedule} Crawl Interval`} />} labelPosition="right" />
      </Flex>
      <Divider color="primary" margin={30} />
      <Flex vertical gap={32}>
        {addOnInfo?.map((item, index) => (
          <Flex vertical gap={12} key={`${index}addOnInfo`}>
            <RadioButton readOnly checked size="lg" label={<Typography text={item.text} />} labelPosition="right" />

            <Controller
              name={`${planType}.${item.key}`}
              render={({ field: { onChange, value } }) => {
                return (
                  <RangeSelector
                    value={value as number}
                    onChange={(e) => onChange((e.target as HTMLInputElement).value)}
                    size="md"
                    thumbColor="primary"
                    max={item.max}
                    min={0}
                    step={item.step}
                  />
                )
              }}
              control={control}
            />
          </Flex>
        ))}
      </Flex>
      <Controller
        name={'selectedPlan'}
        render={({ field: { onChange } }) => {
          return (
            <Button
              size="lg"
              fullWidth
              
              color={buttonColor}
              loading={loading}
              onClick={() => {
                onChange(planType)
                setValue('totalAmount', amount)
                setValue('planId', planId)
                const addOnsData = addOnInfo?.map((item) => ({
                  key: item.key,
                  amount: item.amount,
                  step: item.step,
                  stripe_price_id: item?.stripe_price_id,
                }))
                setValue('selectedPlanData', { planAmount: itemAmount, planType: planType, addOnsData, stripe_price_id: stripe_price_id })
                handleSubmit?.()
              }}
            >
              {buttonText}
            </Button>
          )
        }}
        control={control}
      />
    </Container>
  )
}

export default PlanCard
