import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ADD_KEYWORDS_DEFAULT_VALUES,
  ADD_KEYWORDS_VALIDATIONS,
} from "../utils";

const useAddNewKeyword = () => {
  const { control, reset, handleSubmit } = useForm({
    defaultValues: ADD_KEYWORDS_DEFAULT_VALUES,
    resolver: zodResolver(ADD_KEYWORDS_VALIDATIONS),
  });

  const onSaveKeywords = () => {};

  const handleSaveKeywords = () => {
    handleSubmit(onSaveKeywords)();
  };

  const handleClearKeywordData = () => {
    reset();
  };

  return { control, handleSaveKeywords, handleClearKeywordData };
};

export default useAddNewKeyword;
