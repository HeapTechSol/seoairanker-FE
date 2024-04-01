import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupInitialValues } from "../utils";
import { EXACT_ROUTES } from "@/constant/routes";
import { SignUpSchema } from "@/utils/validations";
import { SignupPayloadTypes } from "../pages/SignUp/types";

const { LOGIN } = EXACT_ROUTES;

const useSignUpHandler = () => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: signupInitialValues,
    resolver: zodResolver(SignUpSchema),
  });

  const signUpHandler = (values: SignupPayloadTypes) => {
    console.log(values);
  };

  const alreadyHaveAccountClick = () => navigate(LOGIN);

  return { control, handleSubmit, signUpHandler, alreadyHaveAccountClick };
};

export default useSignUpHandler;
