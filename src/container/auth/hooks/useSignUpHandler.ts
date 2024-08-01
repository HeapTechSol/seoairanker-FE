import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignUpPayload } from "../authTypes";
import { signupInitialValues } from "../utils";
import { EXACT_ROUTES } from "@/constant/routes";
import { SignUpSchema } from "@/utils/validations";
import { useLazySignUpQuery } from "../api/authAPI";
import { ErrorTypes } from "@/utils/commonTypes";
import { setUser } from "../authSlice";

const { LOGIN, SITES_DASHBOARD } = EXACT_ROUTES;

const useSignUpHandler = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [signUp, { isFetching: isLoading }] = useLazySignUpQuery();

  const { control, handleSubmit } = useForm({
    defaultValues: signupInitialValues,
    resolver: zodResolver(SignUpSchema),
  });

  const signUpHandler = async (values: SignUpPayload) => {
    try {
      const data = await signUp(values).unwrap();
      dispatch(setUser(data?.data))
      toast.success(data?.message);
      navigate(SITES_DASHBOARD)
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
