"use client";

import { Controller } from "react-hook-form";

import Flex from "@/components/Flex";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";

import useForgetPasswordHandler from "@/container/auth/hooks/useForgetPasswordHandler";

import { EmailIcon } from "@/assets/icons/svgs";

import "./ForgetPassword.scss";

const ForgetPassword = () => {
  const { control, handleSubmit, forgetPasswordHandler } =
    useForgetPasswordHandler();

  return (
    <Container
      width={100}
      boxShadow
      borderRadius
      padding={"40px 80px"}
    >
      <Flex vertical gap={24} align="center" justify="center">
        <Typography text="Forgot Password" type="h2" />
        <Flex vertical justify="center" gap={16}>
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
                  error={error?.message}
                  StartIcon={EmailIcon}
                  placeholder="Enter your email"
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
          onClick={handleSubmit(forgetPasswordHandler)}
        >
          Send OTP
        </Button>
      </Flex>
    </Container>
  );
};

export default ForgetPassword;
