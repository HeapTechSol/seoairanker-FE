import { Controller } from 'react-hook-form'

import Flex from '@/components/Flex'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import useLoginHandler from '@/container/auth/hooks/useLoginHandler'
import useSignUpHandler from '@/container/auth/hooks/useSignUpHandler'

import { FcGoogle } from 'react-icons/fc'
import { FaRegUser } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'

import './SignUp.scss'

const SignUp = () => {
  const { onGoogleLogin } = useLoginHandler()
  const { control, isLoading, handleSubmit, signUpHandler, alreadyHaveAccountClick } = useSignUpHandler()

  return (
    <Container width={100} boxShadow borderRadius padding={'60px'} className="auth-form-container">
      <Flex vertical gap={24}>
        <Typography text="Sign Up" type="h2" />
        <Flex vertical justify="center" gap={24}>
          <Controller
            name="firstName"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <Input
                  borderRadius
                  name="firstName"
                  title="First Name"
                  titlePosition="top"
                  onChange={onChange}
                  value={value}
                  error={error?.message}
                  StartIcon={<FaRegUser/>}
                  placeholder="First Name"
                />
              )
            }}
            control={control}
          />
          <Controller
            name="lastName"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <Input
                  borderRadius
                  name="lastName"
                  title="Last Name"
                  titlePosition="top"
                  onChange={onChange}
                  value={value}
                  error={error?.message}
                  StartIcon={<FaRegUser/>}
                  placeholder="Last Name"
                />
              )
            }}
            control={control}
          />
          <Controller
            name="email"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <Input
                  borderRadius
                  name="email"
                  title="Email"
                  type="email"
                  titlePosition="top"
                  onChange={onChange}
                  value={value}
                  StartIcon={<MdOutlineEmail />}
                  error={error?.message}
                  placeholder="Enter your email"
                />
              )
            }}
            control={control}
          />

          <Controller
            name="password"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <Input
                  borderRadius
                  name="password"
                  title="Password"
                  type="password"
                  titlePosition="top"
                  onChange={onChange}
                  value={value}
                  error={error?.message}
                  StartIcon={<RiLockPasswordLine />}
                  placeholder="Enter your password"
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
                  placeholder="Re-Type your password"
                />
              )
            }}
            control={control}
          />
          <Typography text="Already have and account?" link onClick={alreadyHaveAccountClick} />
        </Flex>
        <Flex vertical gap={12}>
          <Button size="md" fullWidth loading={isLoading} variant="filled" type="borderRadius" onClick={handleSubmit(signUpHandler)}>
            Sign Up
          </Button>
          <Button
            size="md"
            fullWidth
            color="error"
            variant="filled"
            type="borderRadius"
            StartIcon={<FcGoogle />}
            onClick={() => onGoogleLogin()}
            fill
          >
            Sign Up in with Google
          </Button>
        </Flex>
      </Flex>
    </Container>
  )
}

export default SignUp
