import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  steps,
  ADD_SITE_WIZARD_DEFAULT_VALUES,
  ADD_SITE_WIZARD_VALIDATIONS,
} from "../utils";

import {
  useAddSiteMutation,
  useDeleteSiteMutation,
  useLazyGetSitesQuery,
} from "../api/sitesAPI";

import { ErrorTypes } from "@/utils/commonTypes";
import { EXACT_ROUTES } from "@/constant/routes";
import { zodResolver } from "@hookform/resolvers/zod";

const { SITES_LIST } = EXACT_ROUTES;

const useHandleSitesLogic = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const { control, getValues, handleSubmit } = useForm({
    defaultValues: ADD_SITE_WIZARD_DEFAULT_VALUES,
    resolver: zodResolver(ADD_SITE_WIZARD_VALIDATIONS[currentStep]),
  });

  const [addSite, { isLoading }] = useAddSiteMutation();
  const [deleteSite, { isLoading: deleteSideLoading }] =
    useDeleteSiteMutation();
  const [getSites, { isFetching: sitesListLoading, data: sitesList }] =
    useLazyGetSitesQuery();

  const stepsCount = steps(control)?.length;

  const handleNext = async () => {
    if (currentStep >= stepsCount) return;
    setCurrentStep((prev) => prev + 1);
  };

  const handleForwardButtonPress = () => {
    handleSubmit(handleNext)();
  };

  const submitHandler = async () => {
    try {
      const values = getValues();
      const response = await addSite(values).unwrap();
      toast.success(response?.message);
      navigate(SITES_LIST);
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message)
        toast.error((error as ErrorTypes)?.data?.message);
    }
  };

  const getSitesList = async () => {
    try {
      await getSites().unwrap();
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message)
        toast.error((error as ErrorTypes)?.data?.message);
    }
  };

  const handleDeleteSite = async (
    id: number,
    setShowModel: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      const response = await deleteSite(id).unwrap();
      toast.success(response?.message, { autoClose: 1000 });
      setShowModel(false);
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message)
        toast.error((error as ErrorTypes)?.data?.message);
    }
  };

  const handlePreviousButtonPress = () => {
    if (currentStep === stepsCount) return;
    setCurrentStep((prev) => prev - 1);
  };

  return {
    control,
    isLoading,
    sitesList:sitesList?.result || [],
    currentStep,
    getSitesList,
    submitHandler,
    handleDeleteSite,
    sitesListLoading,
    deleteSideLoading,
    handlePreviousButtonPress,
    handleForwardButtonPress,
  };
};

export default useHandleSitesLogic;
