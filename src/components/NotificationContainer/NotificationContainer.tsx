import Flex from '../Flex'
import TruncateText from '../TruncateText'
import Container from '../Container/Container'
import Typography from '../Typography/Typography'

import { classMapper, getTime } from '@/utils/helper'

import { GoDotFill } from 'react-icons/go'

import './NotificationContainer.scss'

const NotificationContainer = ({
  isRead = true,
  title = '',
  date,
  description = '',
}: {
  isRead: boolean
  title: string
  description: string
  date: string
}) => {
  const cssClasses = classMapper('notification-container', { 'new-message': !isRead, 'old-message': isRead })

  return (
    <Container className={cssClasses}>
      <Flex vertical gap={6} className="notification-container__header">
        <Flex className='notification-container__body' vertical gap={8}>
          <Typography text={title} type="h4" />
          <TruncateText line={2} text={description} />
        </Flex>
        {!isRead && <GoDotFill className="new-message-icon" />}
        <Typography text={getTime(date)} className="date-time" />
      </Flex>
    </Container>
  )
}

export default NotificationContainer
