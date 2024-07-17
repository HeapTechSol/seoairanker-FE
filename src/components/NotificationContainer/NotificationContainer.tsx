import Flex from '../Flex'
import Container from '../Container/Container'
import Typography from '../Typography/Typography'

import { classMapper, getTime } from '@/utils/helper'

import { GoUnread } from 'react-icons/go'

import './NotificationContainer.scss'
import TruncateText from '../TruncateText'

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
        {!isRead && <GoUnread className="new-message-icon" />}
        <Typography text={title} type="h4" />
        <TruncateText line={2} text={description} />
        <Typography text={getTime(date)} />
      </Flex>
    </Container>
  )
}

export default NotificationContainer
