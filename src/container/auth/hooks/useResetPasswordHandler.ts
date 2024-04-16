import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resetPasswordInitialValues } from "../utils";
import { ResetPasswordSchema } from "@/utils/validations";
import { ResetPasswordPayloadTypes } from "../pages/SignUp/types";

const useResetPasswordHandler = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: resetPasswordInitialValues,
    resolver: zodResolver(ResetPasswordSchema),
  });

  const resetPasswordHandler = (values: ResetPasswordPayloadTypes) => {
    console.log(values);
  };

  return { control, handleSubmit, resetPasswordHandler };
};

export default useResetPasswordHandler;
