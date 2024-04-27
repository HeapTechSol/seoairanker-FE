import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  steps,
  ADD_SITE_WIZARD_VALIDATIONS,
  ADD_SITE_WIZARD_DEFAULT_VALUES,
} from "../utils";
import { toast } from "react-toastify";

const useAddSiteWizardHandler = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const { control, handleSubmit } = useForm({
    defaultValues: ADD_SITE_WIZARD_DEFAULT_VALUES,
    resolver: zodResolver(ADD_SITE_WIZARD_VALIDATIONS[currentStep]),
  });

  const stepsCount = steps(control)?.length;

  const handleNext = (values: any) => {
    if (currentStep >= stepsCount) return;
    setCurrentStep((prev) => prev + 1);
  };

  const handleForwardButtonPress = () => {
    handleSubmit(handleNext)();
  };

  const submitHandler = () => {
    toast.success("Site added successfully", {
      autoClose: 1000,
      position: "bottom-left",
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handlePreviousButtonPress = () => {
    if (currentStep === stepsCount) return;
    setCurrentStep((prev) => prev - 1);
  };

  return {
    control,
    currentStep,
    submitHandler,
    handlePreviousButtonPress,
    handleForwardButtonPress,
  };
};

export default useAddSiteWizardHandler;
