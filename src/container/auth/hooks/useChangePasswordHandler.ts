import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { changePasswordInitialValues } from "../utils";
import { ChangePasswordSchema } from "@/utils/validations";
import { ChangePasswordPayloadTypes } from "../pages/SignUp/types";

const useChangePasswordHandler = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: changePasswordInitialValues,
    resolver: zodResolver(ChangePasswordSchema),
  });

  const changePasswordHandler = (values: ChangePasswordPayloadTypes) => {
    console.log(values);
  };

  return { control, handleSubmit, changePasswordHandler };
};

export default useChangePasswordHandler;
