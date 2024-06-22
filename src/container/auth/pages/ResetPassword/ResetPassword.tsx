import { Controller } from "react-hook-form";

import Flex from "@/components/Flex";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";

import useResetPasswordHandler from "@/container/auth/hooks/useResetPasswordHandler";

import { PasswordIcon } from "@/assets/icons/svgs";

import "./ResetPassword.scss";

const ResetPassword = () => {
  const { control, handleSubmit, resetPasswordHandler } =
    useResetPasswordHandler();

  return (
    <Container width={100} boxShadow borderRadius padding={"40px 80px"} className="container-bg">
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
                  StartIcon={PasswordIcon}
                  placeholder="Enter your new password"
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
                  borderRadius
                  name="confirmPassword"
                  title="Confirm Password"
                  type="password"
                  titlePosition="top"
                  onChange={onChange}
                  value={value}
                  error={error?.message}
                  StartIcon={PasswordIcon}
                  placeholder="Re-enter your password"
                />
              );
            }}
            control={control}
          />
        </Flex>
        <Button
          variant="filled"
          fullWidth
          size="md"
          type="borderRadius"
          onClick={handleSubmit(resetPasswordHandler)}
        >
          Reset Password
        </Button>
      </Flex>
    </Container>
  );
};

export default ResetPassword;
