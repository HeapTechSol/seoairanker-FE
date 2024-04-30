import Stepper from "@/components/Stepper";
import Container from "@/components/Container/Container";

import useAddSiteWizardHandler from "@/container/sites/hooks/useAddSiteWizardHandler";

import { steps } from "@/container/sites/utils";

import "./AddSiteWizard.scss";

const AddSiteWizard = () => {
  const {
    control,
    currentStep,
    submitHandler,
    handleForwardButtonPress,
    handlePreviousButtonPress,
  } = useAddSiteWizardHandler();

  return (
    <Container borderRadius boxShadow className="add-site-wizard">
      <Stepper
        minHeight={"622px"}
        steps={steps(control)}
        componentControl={false}
        activeStepper={currentStep}
        submitHandler={submitHandler}
        handleForwardButtonPress={handleForwardButtonPress}
        handlePreviousButtonPress={handlePreviousButtonPress}
      />
    </Container>
  );
};

export default AddSiteWizard;
