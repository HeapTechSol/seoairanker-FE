import { Controller } from "react-hook-form";

import Flex from "@/components/Flex";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";

import useLoginHandler from "@/container/auth/hooks/useLoginHandler";

import "./Login.scss";

const Login = () => {
  const {
    control,
    handleSubmit,
    loginHandler,
    CookiesProvider,
    onForgetPasswordClick,
  } = useLoginHandler();

  return (
    <CookiesProvider>
      <main className="auth-container">
        <Flex vertical gap={24} align="center" justify="center">
          <h2>Log In</h2>
          <Flex vertical justify="center" gap={16}>
            <Controller
              name="email"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <Input
                    name="email"
                    title="Email"
                    type="email"
                    titlePosition="top"
                    onChange={onChange}
                    value={value}
                    error={error?.message}
                    required
                  />
                );
              }}
              control={control}
            />

            <Controller
              name="password"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <Input
                    name="password"
                    title="Password"
                    type="password"
                    titlePosition="top"
                    onChange={onChange}
                    value={value}
                    error={error?.message}
                    required
                  />
                );
              }}
              control={control}
            />
          </Flex>

          <Flex align="center" justify="between">
            <Controller
              name="isRemember"
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  name="isRemember"
                  label="Remember Me"
                  labelPosition="right"
                  onChange={onChange}
                  checked={value}
                />
              )}
              control={control}
            />
            <p onClick={onForgetPasswordClick} tabIndex={0}>
              Forgot Password?
            </p>
          </Flex>

          <Button
            variant="filled"
            fullWidth
            size="lg"
            onClick={handleSubmit(loginHandler)}
          >
            Log In
          </Button>
        </Flex>
      </main>
    </CookiesProvider>
  );
};

export default Login;
