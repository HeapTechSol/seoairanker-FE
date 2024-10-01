import { useState } from 'react'
import { toast } from 'react-toastify'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'

import Flex from '@/components/Flex'
import Button from '@/components/Button'

import useStripeHandling from '@/container/billing/hooks/useStripeHandling'

import { isEmpty } from '@/utils/helper'
import { EXACT_ROUTES } from '@/constant/routes'
import { CheckoutStateTypes } from '../billingTypes'
import { useAppSelector } from '@/api/store'

type CheckoutFormProps = {
  state: CheckoutStateTypes
}

const CheckoutForm = ({ state }: CheckoutFormProps) => {
  const [loading, setIsLoading] = useState(false)

  const stripe = useStripe()
  const elements = useElements()
  const { handleCheckout } = useStripeHandling()

  const userInfo = useAppSelector((state) => state.auth.user)

  const handlePayment = async () => {
    try {
      if (isEmpty(state)) {
        toast.error('No payment details provided')
        return
      }

      if (!stripe || !elements) {
        toast.error('Stripe has not been initialized')
        return
      }

      setIsLoading(true)

      const { error: submitError } = await elements.submit()
      if (submitError) {
        toast.error(submitError.message || 'An error occurred while submitting payment details')
        setIsLoading(false)
        return
      }

      const { error: setupError, setupIntent } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: window.location.origin + EXACT_ROUTES.ADD_SITE,
        },
        redirect: 'if_required',
      })

      if (setupError) {
        toast.error(setupError.message || 'An error occurred during payment setup')
        setIsLoading(false)
        return
      }

      if (setupIntent && setupIntent.status === 'succeeded') {
        await createSubscription(setupIntent.payment_method as string)
      } else if (setupIntent && setupIntent.status === 'requires_action') {
        const { error } = await stripe.confirmCardSetup(setupIntent.client_secret as string)
        if (error) {
          toast.error(error.message || 'An error occurred during additional authentication')
          setIsLoading(false)
          return
        }
      }
    } catch (error) {
      console.error('Payment error:', error)
      toast.error('An error occurred during payment processing')
    } finally {
      setIsLoading(false)
    }
  }

  const createSubscription = async (paymentMethodId: string) => {
    try {
      const body = {
        plan_id: state.pricing_id,
        email: userInfo?.user.email as string,
        payment_method_id: paymentMethodId,
        userSelectedPlanId: state.planId,
        addons: state?.addOns?.map((item) => ({
          price_id: item.plan_id,
          quantity: item.quantity / item.step,
          feature_name: item.key,
        })),
      }
      await handleCheckout(body)
    } catch (error) {
      toast.error('Failed to create subscription')
    }
  }

  return (
    <Flex vertical align="end" gap={32}>
      <PaymentElement />
      <Button onClick={handlePayment} loading={loading} >
        {loading ? 'Processing...' : 'Pay'}
      </Button>
    </Flex>
  )
}

export default CheckoutForm
