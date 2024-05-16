import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignUpPayload } from "../authTypes";
import { signupInitialValues } from "../utils";
import { EXACT_ROUTES } from "@/constant/routes";
import { SignUpSchema } from "@/utils/validations";
import { useLazySignUpQuery } from "../api/authAPI";
import { ErrorTypes } from "@/utils/commonTypes";

const { LOGIN } = EXACT_ROUTES;

const useSignUpHandler = () => {
  const navigate = useNavigate();

  const [signUp, { isFetching: isLoading }] = useLazySignUpQuery();

  const { control, handleSubmit } = useForm({
    defaultValues: signupInitialValues,
    resolver: zodResolver(SignUpSchema),
  });

  const signUpHandler = async (values: SignUpPayload) => {
    try {
      const user = await signUp(values).unwrap();
      toast.success(user?.message);
      navigate(LOGIN)
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message)
        toast.error((error as ErrorTypes)?.data?.message);
    }
  };

  const alreadyHaveAccountClick = () => navigate(LOGIN);

  return {
    control,
    isLoading,
    handleSubmit,
    signUpHandler,
    alreadyHaveAccountClick,
  };
};

export default useSignUpHandler;
