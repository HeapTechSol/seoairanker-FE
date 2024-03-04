import { Controller } from "react-hook-form";

import Flex from "@/components/Flex";
import Input from "@/components/Input";
import Button from "@/components/Button";

import useChangePasswordHandler from "@/container/auth/hooks/useChangePasswordHandler";

import "./ChangePassword.scss";

const ChangePassword = () => {
  const { control, handleSubmit, changePasswordHandler } = useChangePasswordHandler();

  return (
    <main className="auth-container">
      <Flex vertical gap={24} align="center" justify="center">
        <h2>Change Password</h2>
        <Flex vertical justify="center" gap={16}>
        <Controller
            name="oldPassword"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <Input
                  name="oldPassword"
                  title="Old Password"
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
          onClick={handleSubmit(changePasswordHandler)}
        >
          Change Password
        </Button>
      </Flex>
    </main>
  );
};

export default ChangePassword;
