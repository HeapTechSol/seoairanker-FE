import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupInitialValues } from "../utils";
import { SignUpSchema } from "@/utils/validations";
import { SignupPayloadTypes } from "../pages/SignUp/types";

const useSignUpHandler = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: signupInitialValues,
    resolver: zodResolver(SignUpSchema),
  });

  const signUpHandler = (values: SignupPayloadTypes) => {
    console.log(values);
  };

  return { control, handleSubmit, signUpHandler };
};

export default useSignUpHandler;
