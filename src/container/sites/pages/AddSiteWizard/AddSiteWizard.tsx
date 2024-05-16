import Stepper from "@/components/Stepper";
import Container from "@/components/Container/Container";

import useHandleSitesLogic from "@/container/sites/hooks/useHandleSitesLogic";

import { steps } from "@/container/sites/utils";

import "./AddSiteWizard.scss";

const AddSiteWizard = () => {
  const {
    control,
    currentStep,
    submitHandler,
    handleForwardButtonPress,
    handlePreviousButtonPress,
  } = useHandleSitesLogic();

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
