import { Controller } from "react-hook-form";

import Flex from "@/components/Flex";
import Input from "@/components/Input";
import Button from "@/components/Button";

import useResetPasswordHandler from "@/container/auth/hooks/useResetPasswordHandler";

import "./ResetPassword.scss";

const ResetPassword = () => {
  const { control, handleSubmit, resetPasswordHandler } =
    useResetPasswordHandler();

  return (
    <main className="auth-container">
      <Flex vertical gap={24} align="center" justify="center">
        <h2>Reset Password</h2>
        <Flex vertical justify="center" gap={16}>
          <Controller
            name="password"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <Input
                  name="password"
                  title="New Password"
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
          <Controller
            name="confirmPassword"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <Input
                  name="confirmPassword"
                  title="Confirm Password"
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
        <Button
          variant="filled"
          fullWidth
          size="lg"
          onClick={handleSubmit(resetPasswordHandler)}
        >
          Reset Password
        </Button>
      </Flex>
    </main>
  );
};

export default ResetPassword;
