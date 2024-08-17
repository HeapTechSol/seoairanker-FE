import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAppSelector } from '@/api/store'

import { ErrorTypes } from '@/utils/commonTypes'
import { UpdateUserProfilePayload } from '../authTypes'

import uploadFile from '@/utils/s3BucketActions'
import { setUpdateUserData } from '../authSlice'
import { UpdateProfileSchema } from '@/utils/validations'
import { useUpdateUserProfileMutation } from '../api/authAPI'

const useUpdateUserProfile = () => {
  const dispatch = useDispatch()
  const [updateUserLoading, setUpdateUserLoading] = useState(false)
  const user = useAppSelector((state) => state.auth.user?.user)

  const { control: userProfileControl, handleSubmit: saveUserProfile } = useForm({
    defaultValues: {
      first_name: user?.firstName || '',
      last_name: user?.lastName || '',
      email: user?.email || '',
      profile_img: user?.profileImage || '',
    },
    resolver: zodResolver(UpdateProfileSchema),
  })

  const [updateUserProfile] = useUpdateUserProfileMutation()

  const updateProfile = async (values: UpdateUserProfilePayload) => {
    try {
      setUpdateUserLoading(true)
      if (typeof values.profile_img !== 'string') {
        const imageUrl = await uploadFile(values.profile_img, 'profile_images')
        const data = await updateUserProfile({ ...values, profile_img: imageUrl as string }).unwrap()
        toast.success(data?.message)
        dispatch(setUpdateUserData(data?.data))
      } else {
        const data = await updateUserProfile(values).unwrap()
        toast.success(data?.message)
        dispatch(setUpdateUserData(data?.data))
      }
      setUpdateUserLoading(false)
    } catch (error) {
      setUpdateUserLoading(false)
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  return { userProfileControl, saveUserProfile, updateProfile, updateUserLoading }
}

export default useUpdateUserProfile
