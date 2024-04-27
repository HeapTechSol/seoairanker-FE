import { ColorsTypes } from "@/utils/commonTypes";
import { ReactNode } from "react";

export type steps = {
  title: ReactNode;
  stepLabel: string;
  component: ReactNode;
};

export type StepProps = {
  children: ReactNode;
  completed: boolean;
  active: boolean;
  label?: string;
  onClick: () => void;
};

export type StepperProps = {
  orientation?: "horizontal" | "vertical";
  labelPosition?: "right" | "top" | "bottom";
  steps: steps[];
  requestLoading?: boolean;
  componentControl?: boolean;
  isEdit?: boolean;
  color?: ColorsTypes
  submitHandler?: () => void;
  handleForwardButtonPress?: () => void;
  handlePreviousButtonPress?: () => void;
  handleStepButtonPress?: (index: number) => void;
  activeStepper?: number;
  minHeight?:string
};
