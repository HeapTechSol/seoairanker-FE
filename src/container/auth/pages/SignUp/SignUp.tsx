import { Controller } from "react-hook-form";

import Flex from "@/components/Flex";
import Input from "@/components/Input";
import Button from "@/components/Button";

import useSignUpHandler from "@/container/auth/hooks/useSignUpHandler";

import "./SignUp.scss";

const SignUp = () => {
  const { control, handleSubmit, signUpHandler } = useSignUpHandler();

  return (
    <main className="auth-container">
      <Flex vertical gap={24} align="center" justify="center">
        <h2>Sign Up</h2>
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
                  required
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
                  required
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
          onClick={handleSubmit(signUpHandler)}
        >
          Sign Up
        </Button>
      </Flex>
    </main>
  );
};

export default SignUp;
