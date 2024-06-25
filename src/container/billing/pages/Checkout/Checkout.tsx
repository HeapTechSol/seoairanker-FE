import { useState } from 'react'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from '@stripe/react-stripe-js'

import Button from '@/components/Button'
import useStripeHandling from '@/container/billing/hooks/useStripeHandling'
import { useAppSelector } from '@/api/store'
import { convertFirstCharToCapital, currencyNumberWithDollar, isEmpty } from '@/utils/helper'
import Flex from '@/components/Flex'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import { addOnsData } from '@/constant/plans'

const Checkout = () => {
  const { state } = useLocation()
  const [loading, setIsLoading] = useState(false)

  const stripe = useStripe()
  const elements = useElements()

  const { handleCheckout } = useStripeHandling()

  const userInfo = useAppSelector((state) => state.auth.user)
  const theme = useAppSelector((state) => state.auth.theme)

  const handlePayment = async () => {
    try {
      if (isEmpty(state?.values)) {
        toast.error('No payment details provided')
        return
      }

      if (!stripe || !elements) {
        toast.error('Stripe has not been initialized')
        return
      }

      setIsLoading(true)

      const cardElement = elements.getElement(CardNumberElement)
      if (!cardElement) {
        throw new Error('Card element not found')
      }

      const result = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          email: userInfo?.user.email,
        },
      })

      if (result.error) {
        toast.error(result.error.message)
      } else {
        const body = {
          payment_method_id: result.paymentMethod.id,
          plan_id: 'price_1PUsWGKhs45SIh5yuS25cc29',
          email: userInfo?.user.email,
        }
        const data = await handleCheckout(body)
        if (data?.isSuccess) toast.success('Payment successful')
      }
    } catch (error) {
      console.error('Payment error:', error)
      toast.error('An error occurred during payment processing')
    } finally {
      setIsLoading(false)
    }
  }

  const elementOptions = {
    showIcon: true,
    style: {
      base: {
        fontSize: '16px',
        color: theme === 'dark' ? '#D3D3D3' : '#000000E0',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: theme ==="dark" ?"#424242":"#bdbdbd",
        },
      },
      invalid: {
        color: 'red',
      },
    },
    className: 'StripeElement',
  }

  const sum = (state?.addOns as addOnsData[])?.reduce((prev, curr) => {
    return prev + curr.amount
  }, 0)

  const total = sum + state?.amount

  return (
    <div>
      <Flex vertical gap={32} align="center">
        <Flex gap={32}>
          <Container padding={40} className="container-bg" width={40}>
            <Flex vertical gap={32}>
              <Flex justify="between">
                <Typography text={'Subscribe to '} size="lg" /> <Typography text={convertFirstCharToCapital(state?.plan_type) || ''} type="h3" />
              </Flex>
              <Flex justify="between">
                <Typography text={'Plan Amount '} size="lg" inline />
                <Typography text={`${currencyNumberWithDollar({ value: state?.amount || 0, showUSD: false })}`} type="h3" inline />
              </Flex>
              <Flex vertical gap={16}>
                {!isEmpty(state.addOns) &&
                  (state.addOns as addOnsData[]).map((item) => (
                    <Flex justify="between">
                      <Flex gap={8}>
                        <Typography text={item.quantity} size="lg" inline />{' '}
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
          <Container padding={40} className="container-bg" width={60}>
            <Flex vertical align="end" gap={32}>
              <Flex vertical gap={16}>
                <CardNumberElement options={elementOptions} />
                <CardExpiryElement options={elementOptions} />
                <CardCvcElement options={elementOptions} />
              </Flex>
              <Button onClick={handlePayment} loading={loading} type="borderRadius">
                Pay
              </Button>
            </Flex>
          </Container>
        </Flex>
      </Flex>
    </div>
  )
}

export default Checkout
