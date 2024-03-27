import { useForm } from "react-hook-form";

const useApplyLeave = () => {
  const { control, handleSubmit } = useForm();

  return { control, handleSubmit };
};

export default useApplyLeave;
