import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

import { ErrorTypes } from '@/utils/commonTypes'
import { EXACT_ROUTES } from '@/constant/routes'
import { resetPasswordInitialValues } from '../utils'
import { useResetPasswordMutation } from '../api/authAPI'
import { ResetPasswordSchema } from '@/utils/validations'
import { ResetPasswordPayloadTypes } from '../pages/SignUp/types'

const { LOGIN } = EXACT_ROUTES

const useResetPasswordHandler = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm({
    defaultValues: resetPasswordInitialValues,
    resolver: zodResolver(ResetPasswordSchema),
  })

  const [resetPassword, { isLoading: resetPasswordLoading }] = useResetPasswordMutation()

  const resetPasswordHandler = async (values: ResetPasswordPayloadTypes & { token: string }) => {
    try {
      const response = await resetPassword({ new_password: values.password, token: values.token }).unwrap()
      toast.success(response?.message, { autoClose: 1000 })
      navigate(LOGIN)
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  return { control, handleSubmit, resetPasswordHandler, resetPasswordLoading }
}

export default useResetPasswordHandler
