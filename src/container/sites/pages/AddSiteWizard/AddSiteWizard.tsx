import Stepper from '@/components/Stepper'
import Container from '@/components/Container/Container'

import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'

import { steps } from '@/container/sites/utils'

import './AddSiteWizard.scss'

const AddSiteWizard = () => {
  const { control, currentStep, isLoading, keywordsLoading, submitHandler, handleForwardButtonPress, handlePreviousButtonPress } =
    useHandleSitesLogic()

  return (
    <Container borderRadius boxShadow className="add-site-wizard container-bg">
      <Stepper
        color="common"
        minHeight={'480px'}
        steps={steps(control)}
        componentControl={false}
        activeStepper={currentStep}
        submitHandler={submitHandler}
        requestLoading={isLoading || keywordsLoading}
        handleForwardButtonPress={handleForwardButtonPress}
        handlePreviousButtonPress={handlePreviousButtonPress}
      />
    </Container>
  )
}

export default AddSiteWizard
