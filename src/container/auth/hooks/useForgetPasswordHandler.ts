import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { forgetPasswordInitialValues } from "../utils";
import { ForgetPasswordSchema } from "@/utils/validations";
import { ForgetPasswordPayloadTypes } from "../pages/SignUp/types";
import { useNavigate } from "react-router-dom";
import { EXACT_ROUTES } from "@/constant/routes";

const { VERIFY_OTP } = EXACT_ROUTES;

const useForgetPasswordHandler = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    defaultValues: forgetPasswordInitialValues,
    resolver: zodResolver(ForgetPasswordSchema),
  });

  const forgetPasswordHandler = (values: ForgetPasswordPayloadTypes) => {
    try {
      navigate(VERIFY_OTP, { state: { email: values?.email } });
    } catch (error) {}
  };

  return { control, handleSubmit, forgetPasswordHandler };
};

export default useForgetPasswordHandler;
