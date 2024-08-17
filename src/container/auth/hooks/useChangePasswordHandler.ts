import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ErrorTypes } from '@/utils/commonTypes'
import { changePasswordInitialValues } from '../utils'
import { UpdateUserPasswordPayload } from '../authTypes'
import { ChangePasswordSchema } from '@/utils/validations'
import { useUpdateUserPasswordMutation } from '../api/authAPI'

const useChangePasswordHandler = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: changePasswordInitialValues,
    resolver: zodResolver(ChangePasswordSchema),
  })

  const [updateUserPassword, { isLoading: updatePasswordLoading }] = useUpdateUserPasswordMutation()

  const changePasswordHandler = async (values: UpdateUserPasswordPayload) => {
    try {
      const data = await updateUserPassword(values).unwrap()
      toast.success(data?.message)
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  return { control, handleSubmit, updatePasswordLoading, changePasswordHandler }
}

export default useChangePasswordHandler
