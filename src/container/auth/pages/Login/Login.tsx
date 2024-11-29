import { Controller } from 'react-hook-form'

import Flex from '@/components/Flex'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import useLoginHandler from '@/container/auth/hooks/useLoginHandler'

import { FcGoogle } from 'react-icons/fc'
import { MdOutlineEmail } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'

import './Login.scss'

const Login = () => {
  const { control, isLoading, isGoogleLoading, handleSubmit, loginHandler, onGoogleLogin, onForgetPasswordClick } =
    useLoginHandler()

  return (
    <Container boxShadow borderRadius width={30} padding={'60px'} className="container-bg">
      <Flex vertical gap={24} className="auth-form-box" justify='end'>
        <Typography text="Sign In" type="h2" />

        <Flex vertical gap={24}>
          <Flex vertical gap={4}>
            <Controller
              name="email"
              render={({ field: { onChange, value }, fieldState: { error } }) => {
                return (
                  <Input
                    type="email"
                    name="email"
                    title="Email"
                    color="warning"
                    value={value}
                    autoComplete="new-email"
                    titlePosition="top"
                    onChange={onChange}
                    StartIcon={<MdOutlineEmail />}
                    error={error?.message}
                    placeholder="Enter your email"
                  />
                )
              }}
              control={control}
            />
            {/* <Typography link size="sm" text="Don't have an account?" onClick={onNoAccountClick} /> */}
          </Flex>
          <Flex vertical gap={4}>
            <Controller
              name="password"
              render={({ field: { onChange, value }, fieldState: { error } }) => {
                return (
                  <Input
                    value={value}
                    type="password"
                    name="password"
                    title="Password"
                    titlePosition="top"
                    onChange={onChange}
                    error={error?.message}
                    StartIcon={<RiLockPasswordLine />}
                    placeholder="Enter your password"
                  />
                )
              }}
              control={control}
            />

            <Typography link size="sm" text=" Forgot Password?" onClick={onForgetPasswordClick} />
          </Flex>
        </Flex>
        <Flex vertical gap={12}>
          <Button size="md" fullWidth loading={isLoading} variant="filled" onClick={handleSubmit(loginHandler)}>
            Sign In
          </Button>
          {/* <Button
            size="md"
            fullWidth
            variant="filled"
            StartIcon={<FcGoogle />}
            loading={isGoogleLoading}
            onClick={() => onGoogleLogin()}
            fill
          >
            Sign in with Google
          </Button> */}
        </Flex>
      </Flex>
    </Container>
  )
}

export default Login
