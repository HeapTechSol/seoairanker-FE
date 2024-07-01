import { loadStripe } from '@stripe/stripe-js'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'

import Flex from '@/components/Flex'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import CheckoutForm from '@/container/billing/components/CheckoutForm'

import { useAppSelector } from '@/api/store'

import useStripeHandling from '@/container/billing/hooks/useStripeHandling'

import { StateAddOnsTypes } from '@/container/billing/billingTypes'
import { convertFirstCharToCapital, currencyNumberWithDollar, isEmpty } from '@/utils/helper'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY)

const Checkout = () => {
  const { state } = useLocation()
  const theme = useAppSelector((state) => state.auth.theme)

  const { clientSecret, getPaymentIntentClientSecret } = useStripeHandling()

  const stateAddOns: StateAddOnsTypes[] = state.addOns

  useEffect(() => {
    const fetchSecret = async () => {
      await getPaymentIntentClientSecret()
    }
    fetchSecret()
  }, [])

  const sum = stateAddOns?.reduce((prev, curr) => prev + curr.amount, 0)
  const total = sum + state?.amount

  const appearance = {
    mode: 'setup',
    theme: (theme === 'dark' ? 'night' : 'stripe') as 'night',
    variables: {
      colorPrimary: theme === 'dark' ? '#D3D3D3' : '#000000E0',
      colorBackground: theme === 'dark' ? '#1A1A1A' : '#FFFFFF',
      colorText: theme === 'dark' ? '#D3D3D3' : '#000000E0',
      colorDanger: '#FF5252',
    },
  }

  return (
    <div>
      <Flex vertical gap={32} align="center">
        <Flex gap={32}>
          <Container padding={40} className="container-bg" width={55}>
            <Flex vertical gap={32}>
              <Flex justify="between">
                <Typography text={'Subscribe to '} size="lg" />
                <Typography text={convertFirstCharToCapital(state?.plan_type) || ''} type="h3" />
              </Flex>
              <Flex justify="between">
                <Typography text={'Plan Amount '} size="lg" inline />
                <Typography text={`${currencyNumberWithDollar({ value: state?.amount || 0, showUSD: false })}`} type="h3" inline />
              </Flex>
              <Flex vertical gap={16}>
                {!isEmpty(state.addOns) &&
                  stateAddOns?.map((item) => (
                    <Flex justify="between" key={item.plan_id}>
                      <Flex gap={8}>
                        <Typography text={item.quantity} size="lg" inline />
                        <Typography text={convertFirstCharToCapital(item.key?.replace('_', ' '))} size="lg" inline />
                      </Flex>
                      <Typography text={`${currencyNumberWithDollar({ value: item?.amount || 0, showUSD: false })}`} type="h3" inline />
                    </Flex>
                  ))}
              </Flex>
              <Flex justify="between">
                <Typography text={'Total'} type="h2" />
                <Typography text={`${currencyNumberWithDollar({ value: total || 0, showUSD: false })}`} type="h2" />
              </Flex>
            </Flex>
          </Container>
          <Container padding={40} className="container-bg" width={45}>
            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                <CheckoutForm state={state} />
              </Elements>
            )}
          </Container>
        </Flex>
      </Flex>
    </div>
  )
}

export default Checkout
