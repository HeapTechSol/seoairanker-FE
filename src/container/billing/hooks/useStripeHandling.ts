import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ErrorTypes } from '@/utils/commonTypes'
import { useCheckoutMutation, useLazyStripePaymentIntentQuery, useLazyGetAllPlansQuery } from '../api/billingAPI'

import { CheckoutPayload } from '../billingTypes'
import { useAppSelector } from '@/api/store'
import { UserTypes } from '@/container/auth/authTypes'
import { setUser } from '@/container/auth/authSlice'
import { EXACT_ROUTES } from '@/constant/routes'

const useStripeHandling = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userInfo = useAppSelector((state) => state.auth.user)

  const [checkout] = useCheckoutMutation()
  const [getAllPlans, { data: allPlansList, isFetching: plansLoading }] = useLazyGetAllPlansQuery()
  const [getClientSecret, { data: paymentIntent }] = useLazyStripePaymentIntentQuery()

  const handleCheckout = async (payload: CheckoutPayload) => {
    try {
      await checkout(payload).unwrap()
      dispatch(setUser({ ...userInfo, isActiveSubscription: true } as UserTypes))
      toast.success('Subscription created successfully')
      navigate(EXACT_ROUTES.ADD_SITE)
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const getPaymentIntentClientSecret = async () => {
    try {
      await getClientSecret().unwrap()
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const getPlansList = async () => {
    try {
      await getAllPlans().unwrap()
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  return { handleCheckout, clientSecret: paymentIntent?.client_secret, getPaymentIntentClientSecret, allPlansList, plansLoading, getPlansList }
}

export default useStripeHandling
