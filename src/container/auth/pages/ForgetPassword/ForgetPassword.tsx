import { Controller } from "react-hook-form";

import Flex from "@/components/Flex";
import Input from "@/components/Input";
import Button from "@/components/Button";

import useForgetPasswordHandler from "@/container/auth/hooks/useForgetPasswordHandler";

import "./ForgetPassword.scss";

const ForgetPassword = () => {
  const { control, handleSubmit, forgetPasswordHandler } =
    useForgetPasswordHandler();

  return (
    <main className="auth-container">
      <Flex vertical gap={24} align="center" justify="center">
        <h2>Forget Password</h2>
        <Flex vertical justify="center" gap={16}>
          <Controller
            name="email"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
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
        </Flex>
        <Button
          variant="filled"
          fullWidth
          size="lg"
          onClick={handleSubmit(forgetPasswordHandler)}
        >
          Send OTP
        </Button>
      </Flex>
    </main>
  );
};

export default ForgetPassword;
