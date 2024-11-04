import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

import Flex from '@/components/Flex'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import useResetPasswordHandler from '@/container/auth/hooks/useResetPasswordHandler'

import { RiLockPasswordLine } from 'react-icons/ri'

import { EXACT_ROUTES } from '@/constant/routes'
import { ResetPasswordPayloadTypes } from '../SignUp/types'

import './ResetPassword.scss'

const { LOGIN } = EXACT_ROUTES

const ResetPassword = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get('token')
  const { control, handleSubmit, resetPasswordHandler, resetPasswordLoading } = useResetPasswordHandler()

  const handleResetPassword = (values: ResetPasswordPayloadTypes) => {
    resetPasswordHandler({ ...values, token: token || '' })
  }

  useEffect(() => {
    if (!token) navigate(LOGIN)
  }, [token])

  return (
    <Container width={100} boxShadow borderRadius padding={'40px 80px'} className="container-bg">
      <Flex vertical gap={24} align="center" justify="center">
        <Typography text="Reset Password" type="h2" />
        <Flex vertical justify="center" gap={16}>
          <Controller
            name="password"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <Input
                  borderRadius
                  name="password"
                  title="New Password"
                  type="password"
                  titlePosition="top"
                  onChange={onChange}
                  value={value}
                  error={error?.message}
                  StartIcon={<RiLockPasswordLine />}
                  placeholder="Enter your new password"
                />
              )
            }}
            control={control}
          />
          <Controller
            name="confirmPassword"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <Input
                  borderRadius
                  name="confirmPassword"
                  title="Confirm Password"
                  type="password"
                  titlePosition="top"
                  onChange={onChange}
                  value={value}
                  error={error?.message}
                  StartIcon={<RiLockPasswordLine />}
                  placeholder="Re-enter your password"
                />
              )
            }}
            control={control}
          />
        </Flex>
        <Button variant="filled" fullWidth size="md" type="borderRadius" loading={resetPasswordLoading} onClick={handleSubmit(handleResetPassword)}>
          Reset Password
        </Button>
      </Flex>
    </Container>
  )
}

export default ResetPassword
