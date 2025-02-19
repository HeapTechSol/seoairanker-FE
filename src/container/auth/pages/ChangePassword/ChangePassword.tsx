import { Controller } from "react-hook-form";

import Flex from "@/components/Flex";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";

import useChangePasswordHandler from "@/container/auth/hooks/useChangePasswordHandler";

import { RiLockPasswordLine } from "react-icons/ri";

import "./ChangePassword.scss";

const ChangePassword = () => {
  const { control, handleSubmit, changePasswordHandler } =
    useChangePasswordHandler();

  return (
    <Container width={100} boxShadow borderRadius padding={"40px 80px"}>
      <Flex vertical gap={24} align="center" justify="center">
        <Typography text="Change Password" type="h2" />
        <Flex vertical justify="center" gap={16}>
          {/* <Controller
            name="oldPassword"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <Input
                  borderRadius
                  name="oldPassword"
                  title="Old Password"
                  type="password"
                  titlePosition="top"
                  onChange={onChange}
                  value={value}
                  error={error?.message}
                  StartIcon={<RiLockPasswordLine/>}
                  placeholder="Enter your old password"
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
                  borderRadius
                  name="password"
                  title="New Password"
                  type="password"
                  titlePosition="top"
                  onChange={onChange}
                  value={value}
                  error={error?.message}
                  StartIcon={<RiLockPasswordLine/>}
                  placeholder="Enter your new password"
                />
              );
            }}
            control={control}
          /> */}
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
                  StartIcon={<RiLockPasswordLine/>}
                  placeholder="Re-enter your new password"
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
          onClick={handleSubmit(changePasswordHandler)}
        >
          Change Password
        </Button>
      </Flex>
    </Container>
  );
};

export default ChangePassword;
