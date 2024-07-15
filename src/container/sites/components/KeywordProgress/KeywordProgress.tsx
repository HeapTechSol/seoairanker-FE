import Flex from '@/components/Flex'
import Typography from '@/components/Typography/Typography'

import { HiArrowNarrowUp } from 'react-icons/hi'

const KeywordProgress = ({ count = 0 }: { count?: number }) => {
  return (
    <Flex align="center" gap={4} inline>
      <Typography color="success" text={`${count}%`} />
      <HiArrowNarrowUp />
    </Flex>
  )
}

export default KeywordProgress
