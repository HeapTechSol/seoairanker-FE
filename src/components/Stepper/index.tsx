import { classMapper } from '@/utils/helper';
import { Fragment, useRef, useState } from 'react';

import './Stepper.scss';
import { StepperProps } from './types';
import Button from '../Button';
import Step from './Step';

const Stepper = ({
  orientation,
  labelPosition = 'right',
  steps,
  requestLoading,
  isEdit,
  color,
  submitHandler,
  handleForwardButtonPress,
  handlePreviousButtonPress,
  handleStepButtonPress,
  activeStepper,
  componentControl = true,
}: StepperProps) => {
  const stepActionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    if (!componentControl) {
      handleForwardButtonPress?.();
      return;
    }
    setActiveStep((prevStep) => (prevStep < steps?.length - 1 ? prevStep + 1 : prevStep));
  };

  const handleBack = () => {
    if (!componentControl) {
      handlePreviousButtonPress?.();
      return;
    }
    setActiveStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  };

  const stepClickHanlder = (index: number) => {
    if (!componentControl) {
      handleStepButtonPress?.(index);
      return;
    }
    setActiveStep(index);
  };

  const classes = classMapper('stepper-container', {
    [orientation]: orientation,
    [labelPosition]: labelPosition,
    [color]: color,
  });
  const currentStep = activeStepper ? activeStepper : activeStep;

  const lastStep = currentStep === steps?.length - 1;

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
                onClick={() => (isEdit ? stepClickHanlder(index) : null)}
              >
                {step.title}
              </Step>
              {index !== steps?.length - 1 && <span className="step-separator"></span>}
            </Fragment>
          );
        })}
      </div>

      <div className="component-controls">
        <div className="stepper-components">{steps ? steps[currentStep]?.component : ''}</div>

        <div className="stepper-controls">
          <Button variant="outlined" onClick={handleBack} disabled={!currentStep || requestLoading}>
            Back
          </Button>

          <Button
            variant="filled"
            onClick={!requestLoading ? (lastStep ? submitHandler : handleNext) : () => null}
            loading={requestLoading}
          >
            {lastStep ? 'Submit' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
