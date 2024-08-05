import Flex from '@/components/Flex'
import Typography from '@/components/Typography/Typography'

import { classMapper } from '@/utils/helper'

import { HiArrowNarrowUp } from 'react-icons/hi'

import './keywordProgress.scss'

const KeywordProgress = ({ count = 0 }: { count?: number }) => {
  const isIncrement = count > 0
  return (
    <>
      {!count ? null : (
        <Flex align="center" gap={4} inline className={classMapper('keyword-progress', { decrement: !isIncrement })}>
          <Typography color={isIncrement ? 'success' : 'error'} text={`${Math.abs(count)}%`} />
          <HiArrowNarrowUp />
        </Flex>
      )}
    </>
  )
}

export default KeywordProgress
