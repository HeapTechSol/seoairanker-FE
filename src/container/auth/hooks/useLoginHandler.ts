import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { TokenResponse, useGoogleLogin } from '@react-oauth/google'

import { setUser } from '../authSlice'
import { loginInitialValues } from '../utils'
import { GoogleUserInfo } from '../authTypes'
import { ErrorTypes } from '@/utils/commonTypes'
import { EXACT_ROUTES } from '@/constant/routes'
import { LoginSchema } from '@/utils/validations'
import { useLazyGoogleAuthQuery, useLazySignInQuery } from '../api/authAPI'
import { LoginPayloadTypes } from '../pages/SignUp/types'

const { FORGET_PASSWORD, SIGNUP, SITES_DASHBOARD } = EXACT_ROUTES

const useLoginHandler = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [signIn, { isFetching: isLoading }] = useLazySignInQuery()
  const [googleAuth, { isFetching: isGoogleLoading }] = useLazyGoogleAuthQuery()

  const { control, handleSubmit } = useForm({
    defaultValues: loginInitialValues,
    resolver: zodResolver(LoginSchema),
  })

  const loginHandler = async (credentials: LoginPayloadTypes) => {
    try {
      const data = await signIn(credentials).unwrap()
      dispatch(setUser(data.result))
      navigate(SITES_DASHBOARD)
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const onNoAccountClick = () => navigate(SIGNUP)

  const onForgetPasswordClick = () => navigate(FORGET_PASSWORD)

  const handleGoogleLoginSuccess = async (tokenResponse: TokenResponse) => {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const userInfo: GoogleUserInfo = await response.json()
      const { email, given_name: firstName, family_name: lastName, picture: profileImage } = userInfo

      const data = await googleAuth({ email, firstName, lastName, profileImage }).unwrap()
      dispatch(setUser(data.result))
      navigate(SITES_DASHBOARD)
    } catch (error) {
      console.error('Error during Google login:', error instanceof Error ? error.message : String(error))
      toast.error('Failed to login with Google. Please try again.')
    }
  }

  const onGoogleLogin = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: (errorResponse) => {
      console.log(errorResponse)
    },
    onNonOAuthError: (nonOAuthError) => {
      console.log(nonOAuthError)
    },
  })

  return {
    control,
    isLoading: isLoading || isGoogleLoading,
    handleSubmit,
    loginHandler,
    onGoogleLogin,
    onNoAccountClick,
    onForgetPasswordClick,
  }
}

export default useLoginHandler
