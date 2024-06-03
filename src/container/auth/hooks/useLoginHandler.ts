import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginInitialValues } from "../utils";
import { ErrorTypes } from "@/utils/commonTypes";
import { EXACT_ROUTES } from "@/constant/routes";
import { LoginSchema } from "@/utils/validations";
import { useLazySignInQuery } from "../api/authAPI";
import { LoginPayloadTypes } from "../pages/SignUp/types";
import { useDispatch } from "react-redux";
import { setUser } from "../authSlice";

const { FORGET_PASSWORD, SIGNUP, SITES_DASHBOARD } = EXACT_ROUTES;

const useLoginHandler = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [signIn, { isFetching: isLoading }] = useLazySignInQuery();
  const { control, handleSubmit } = useForm({
    defaultValues: loginInitialValues,
    resolver: zodResolver(LoginSchema),
  });

  const loginHandler = async (credentials: LoginPayloadTypes) => {
    try {
      const data = await signIn(credentials).unwrap()
      dispatch(setUser(data.result))
      navigate(SITES_DASHBOARD)
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message);
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
    isLoading,
    handleSubmit,
    loginHandler,
    onGoogleLogin,
    onNoAccountClick,
    onForgetPasswordClick,
  };
};

export default useLoginHandler;
