import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginInitialValues } from "../utils";
import { EXACT_ROUTES } from "@/constant/routes";
import { LoginSchema } from "@/utils/validations";
import { LoginPayloadTypes } from "../pages/SignUp/types";

const { FORGET_PASSWORD, SIGNUP } = EXACT_ROUTES;

const useLoginHandler = () => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: loginInitialValues,
    resolver: zodResolver(LoginSchema),
  });

  const loginHandler = (credentials: LoginPayloadTypes) => {
    try {
      console.log(credentials);
    } catch (error) {
      console.log(error);
    }
  };

  const onNoAccountClick = () => navigate(SIGNUP);

  const onForgetPasswordClick = () => navigate(FORGET_PASSWORD);

  const onGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log("token Response", tokenResponse),
    onError: (errorResponse) => {
      console.log(errorResponse);
    },
    onNonOAuthError: (nonOAuthError) => {
      console.log(nonOAuthError);
    },
  });

  return {
    control,
    handleSubmit,
    loginHandler,
    onGoogleLogin,
    onNoAccountClick,
    onForgetPasswordClick,
  };
};

export default useLoginHandler;
