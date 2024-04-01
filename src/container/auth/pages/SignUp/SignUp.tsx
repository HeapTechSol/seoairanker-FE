"use client";

import { Controller } from "react-hook-form";

import Flex from "@/components/Flex";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";

import useLoginHandler from "@/container/auth/hooks/useLoginHandler";
import useSignUpHandler from "@/container/auth/hooks/useSignUpHandler";

import {
  EmailIcon,
  PasswordIcon,
  GoogleIcon,
  PersonIcon,
} from "@/assets/icons/svgs";

import "./SignUp.scss";

const SignUp = () => {
  const { onGoogleLogin } = useLoginHandler();
  const { control, handleSubmit, signUpHandler, alreadyHaveAccountClick } =
    useSignUpHandler();

  return (
    <Container center width={70} boxShadow borderRadius padding={"40px 80px"}>
      <Flex vertical gap={24}>
        <Typography text="Sign Up" type="h2" />
        <Flex vertical justify="center" gap={16}>
          <Controller
            name="firstName"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <Input
                  name="firstName"
                  title="First Name"
                  titlePosition="top"
                  onChange={onChange}
                  value={value}
                  error={error?.message}
                  StartIcon={PersonIcon}
                  placeholder="First Name"
                />
              );
            }}
            control={control}
          />
          <Controller
            name="lastName"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <Input
                  name="lastName"
                  title="Last Name"
                  titlePosition="top"
                  onChange={onChange}
                  value={value}
                  error={error?.message}
                  StartIcon={PersonIcon}
                  placeholder="Last Name"
                />
              );
            }}
            control={control}
          />
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
                  StartIcon={EmailIcon}
                  error={error?.message}
                  placeholder="Enter your email"
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
                  title="Password"
                  type="password"
                  titlePosition="top"
                  onChange={onChange}
                  value={value}
                  error={error?.message}
                  StartIcon={PasswordIcon}
                  placeholder="Enter your password"
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
                  StartIcon={PasswordIcon}
                  placeholder="Re-Type your password"
                />
              );
            }}
            control={control}
          />
        </Flex>
        <Typography
          text="Already have and account?"
          link
          color="primary"
          onClick={alreadyHaveAccountClick}
        />
        <Button
          variant="filled"
          fullWidth
          size="lg"
          onClick={handleSubmit(signUpHandler)}
        >
          Sign Up
        </Button>
        <Button
          size="lg"
          fullWidth
          color="error"
          variant="filled"
          type="borderRadius"
          StartIcon={GoogleIcon}
          onClick={() => onGoogleLogin()}
        >
          Sign in with Google
        </Button>
      </Flex>
    </Container>
  );
};

export default SignUp;
