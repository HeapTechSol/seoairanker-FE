import { Fragment, useRef, useState } from 'react'

import Step from './Step'
import Button from '../Button'

import { classMapper } from '@/utils/helper'

import { StepperProps } from './types'

import './Stepper.scss'

const Stepper = ({
  orientation = 'horizontal',
  labelPosition = 'right',
  steps,
  requestLoading,
  isEdit,
  color = 'primary',
  nextButtonDisabled = false,
  nextButtonText = 'Next',
  submitHandler,
  handleForwardButtonPress,
  handlePreviousButtonPress,
  handleStepButtonPress,
  activeStepper,
  componentControl = true,
  showInternalButtons = true,
  minHeight = '100%',
}: StepperProps) => {
  const stepActionRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState<number>(0)

  const handleNext = () => {
    if (!componentControl) {
      handleForwardButtonPress?.()
      return
    }
    setActiveStep((prevStep) => (prevStep < steps?.length - 1 ? prevStep + 1 : prevStep))
  }

  const handleBack = () => {
    if (!componentControl) {
      handlePreviousButtonPress?.()
      return
    }
    setActiveStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep))
  }

  const stepClickHandler = (index: number) => {
    if (!componentControl) {
      URL
      handleStepButtonPress?.(index)
      return
    }
    setActiveStep(index)
  }

  const classes = classMapper('stepper-container', {
    [orientation]: orientation,
    [labelPosition]: labelPosition,
    [color]: color,
  })
  const currentStep = activeStepper ? activeStepper : activeStep

  const lastStep = currentStep === steps?.length - 1

  return (
    <div className={classes}>
      <div className="stepper-actions" ref={stepActionRef}>
        {steps?.map((step, index) => {
          return (
            <Fragment key={`${index}step`}>
              <Step
                label={step.stepLabel}
                completed={isEdit ? true : currentStep > index}
                active={currentStep === index}
                onClick={() => (isEdit ? stepClickHandler(index) : null)}
              >
                {step.title}
              </Step>
              {index !== steps?.length - 1 && <span className="step-separator"></span>}
            </Fragment>
          )
        })}
      </div>

      <div className="component-controls">
        <div className="stepper-components" style={{ minHeight: minHeight }}>
          {steps ? steps[currentStep]?.component : ''}
        </div>

        {showInternalButtons && (
          <div className="stepper-controls">
            <Button variant="outlined" onClick={handleBack} type="borderRadius" disabled={!currentStep || requestLoading}>
              Back
            </Button>

            <Button
              variant="filled"
              type="borderRadius"
              onClick={!requestLoading ? (lastStep ? submitHandler : handleNext) : () => null}
              loading={requestLoading}
              disabled={nextButtonDisabled}
            >
              {lastStep ? 'Finished' : nextButtonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Stepper
