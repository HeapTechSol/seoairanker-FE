import Chip from '@/components/Chip';

import { WORK_OUTLINED } from '@/assets/icons/svgs';

const TestPage = () => {
  return (
    <>
      <Chip text="new password" Icon={WORK_OUTLINED} iconPlacement="end" size="lg" rounded bordered variant="outlined" color="error" />
    </>
  );
};

export default TestPage;
