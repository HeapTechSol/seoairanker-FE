import { classMapper } from '@/utils/helper';

import { StepProps } from './types';

const Step = ({ children, completed, active, label, onClick }: StepProps) => {
  const labelText = label && <span className="step-label">{label}</span>;

  const classes = classMapper('step-container', { completed: completed, active: active });

  return (
    <div className={classes} onClick={onClick}>
      <span className="step">{children}</span> {labelText}
    </div>
  );
};

export default Step;
