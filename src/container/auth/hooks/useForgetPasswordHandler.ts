import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ErrorTypes } from '@/utils/commonTypes'
import { forgetPasswordInitialValues } from '../utils'
import { useForgotPasswordMutation } from '../api/authAPI'
import { ForgetPasswordSchema } from '@/utils/validations'
import { ForgetPasswordPayloadTypes } from '../pages/SignUp/types'

const useForgetPasswordHandler = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: forgetPasswordInitialValues,
    resolver: zodResolver(ForgetPasswordSchema),
  })

  const [forgotPassword, { isLoading: forgotPasswordLoading }] = useForgotPasswordMutation()

  const forgetPasswordHandler = async (values: ForgetPasswordPayloadTypes) => {
    try {
      const response = await forgotPassword({ email: values.email }).unwrap()
      toast.success(response?.message, { autoClose: 1000 })
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  return { control, handleSubmit, forgetPasswordHandler, forgotPasswordLoading }
}

export default useForgetPasswordHandler
