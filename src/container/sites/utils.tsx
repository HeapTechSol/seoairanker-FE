import { z } from "zod";

import AddSite from "@/container/sites/components/AddSite/AddSite";
import ScriptPage from "@/container/sites/components/ScriptPage/ScriptPage";
import AddKeywords from "@/container/sites/components/AddKeywords/AddKeywords";
import KeywordsInfo from "@/container/sites/components/KeywordsInfo/KeywordsInfo";
import AddSiteDetails from "@/container/sites/components/AddSiteDetails/AddSiteDetails";
import RecommendationInfo from "@/container/sites/components/RecommendationsInfo/RecommendationInfo";

import { CommonValidations } from "@/utils/commonValidations";

const { requiredMessage } = CommonValidations;

export const ADD_SITE_WIZARD_DEFAULT_VALUES = {
  site_url: "",
  pages: 0,
  jsonSchemas: false,
  business_type: "",
  search_country: "",
  preferred_language: "",
};

export const ADD_SITE_WIZARD_VALIDATIONS = [
  z.object({
    site_url: z
      .string({
        invalid_type_error: requiredMessage("Site URL"),
        required_error: requiredMessage("Site URL"),
      })
      .url({message:"Site URL is invalid"})
      .min(5, requiredMessage("Site URL")),
    pages: z.number().optional(),
    jsonSchemas: z.boolean().optional(),
  }),
  z
    .object({
      business_type: z
        .string({
          invalid_type_error: requiredMessage("Business type"),
          required_error: requiredMessage("Business type"),
        })
        .min(5, requiredMessage("Business type")),
      search_country: z
        .string({
          invalid_type_error: requiredMessage("Search Country"),
          required_error: requiredMessage("Search Country"),
        })
        .min(2, requiredMessage("Search Country")),
      preferred_language: z
        .string({
          invalid_type_error: requiredMessage("Language"),
          required_error: requiredMessage("Language"),
        })
        .min(2, requiredMessage("Language")),
    })
    .optional(),
  z.object({}).optional(),
  z.object({}).optional(),
  z.object({}).optional(),
  z.object({}).optional(),
];

export const steps = (control: any) => [
  {
    title: "Add Site",
    stepLabel: "1",
    component: <AddSite control={control} />,
  },
  {
    title: "Details",
    stepLabel: "2",
    component: <AddSiteDetails control={control} />,
  },
  {
    title: "Keywords",
    stepLabel: "3",
    component: <KeywordsInfo />,
  },
  {
    title: "Automation",
    stepLabel: "4",
    component: <AddKeywords />,
  },
  {
    title: "Generating",
    stepLabel: "5",
    component: <RecommendationInfo />,
  },
  {
    title: "Install",
    stepLabel: "6",
    component: <ScriptPage />,
  },
];
