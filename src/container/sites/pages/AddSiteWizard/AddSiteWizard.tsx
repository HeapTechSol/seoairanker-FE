import { useEffect } from 'react'
import { useWatch } from 'react-hook-form'

import Stepper from '@/components/Stepper'
import Container from '@/components/Container/Container'

import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'

import { steps } from '@/container/sites/utils'

import './AddSiteWizard.scss'

const AddSiteWizard = () => {
  const { control, currentStep, isLoading, keywordsLoading, submitHandler, getKeywords, handleForwardButtonPress, handlePreviousButtonPress } =
    useHandleSitesLogic()

  const formData = useWatch({ control })

  useEffect(() => {
    if (formData.siteUrl && formData.country && formData.language && currentStep === 2 && !formData.keywords)
      getKeywords({ siteUrl: formData?.siteUrl || '', language_code: formData.language || '', location_code: formData.country || '' })
  }, [currentStep])

  return (
    <Container borderRadius boxShadow className="add-site-wizard container-bg">
      <Stepper
        color="common"
        minHeight={'622px'}
        steps={steps(control)}
        requestLoading={isLoading || keywordsLoading}
        componentControl={false}
        activeStepper={currentStep}
        submitHandler={submitHandler}
        handleForwardButtonPress={handleForwardButtonPress}
        handlePreviousButtonPress={handlePreviousButtonPress}
      />
    </Container>
  )
}

export default AddSiteWizard
