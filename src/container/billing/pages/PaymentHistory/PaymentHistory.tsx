import Chip from '@/components/Chip'
import Flex from '@/components/Flex'
import Table from '@/components/Table'
import Grid from '@/components/Grid/Grid'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import { CrawlIcon, PagesIcon, PersonIcon, SearchIconWithFilledBackground } from '@/assets/icons/svgs'

import './PaymentHistory.scss'

const PaymentHistory = () => {
  const status = {
    Processed: <Chip circled text="Processed" color="success" />,
    Declined: <Chip circled text="Declined" color="error" />,
  }
  const columns = [
    { header: 'Payment ID', dataKey: 'id' },
    { header: 'Date', dataKey: 'date' },
    { header: 'Type', dataKey: 'type' },
    { header: 'Total', dataKey: 'total' },
    {
      header: 'Status',
      dataKey: 'status',
      render: (value: string) => status[value as keyof typeof status],
    },
  ]
  const data = [
    {
      id: 's54df6ds4f6sd5f565sdf56ds',
      date: 'June 28, 2023',
      type: 'Subscription',
      total: '$100.00',
      status: 'Processed',
    },
    {
      id: 's54df6ds4f6sd5f565sdf56ds',
      date: 'June 28, 2023',
      type: 'Subscription',
      total: '$100.00',
      status: 'Processed',
    },
    {
      id: 's54df6ds4f6sd5f565sdf56ds',
      date: 'June 28, 2023',
      type: 'Subscription',
      total: '$100.00',
      status: 'Declined',
    },
    {
      id: 's54df6ds4f6sd5f565sdf56ds',
      date: 'June 28, 2023',
      type: 'Subscription',
      total: '$100.00',
      status: 'Processed',
    },
    {
      id: 's54df6ds4f6sd5f565sdf56ds',
      date: 'June 28, 2023',
      type: 'Subscription',
      total: '$100.00',
      status: 'Processed',
    },
    {
      id: 's54df6ds4f6sd5f565sdf56ds',
      date: 'June 28, 2023',
      type: 'Subscription',
      total: '$100.00',
      status: 'Processed',
    },
    {
      id: 's54df6ds4f6sd5f565sdf56ds',
      date: 'June 28, 2023',
      type: 'Subscription',
      total: '$100.00',
      status: 'Processed',
    },
    {
      id: 's54df6ds4f6sd5f565sdf56ds',
      date: 'June 28, 2023',
      type: 'Subscription',
      total: '$100.00',
      status: 'Processed',
    },
  ]
  return (
    <Flex vertical gap={40}>
      <Grid>
        <Container borderRadius boxShadow padding={20} className="payment-history-card container-bg">
          <Flex align="center" gap={24}>
            {PersonIcon}
            <Flex vertical gap={8}>
              <Typography type="h3" text="Team Members" />
              <Typography text="3 of 10" />
            </Flex>
          </Flex>
        </Container>
        <Container borderRadius boxShadow padding={20} className="payment-history-card container-bg">
          <Flex align="center" gap={24}>
            {CrawlIcon}
            <Flex vertical gap={8}>
              <Typography type="h3" text="Site Crawls" />
              <Typography text="15 of 250" />
            </Flex>
          </Flex>
        </Container>
        <Container borderRadius boxShadow padding={20} className="payment-history-card container-bg">
          <Flex align="center" gap={24}>
            {SearchIconWithFilledBackground}
            <Flex vertical gap={8}>
              <Typography type="h3" text="Keyword Searches" />
              <Typography text="100 of 250" />
            </Flex>
          </Flex>
        </Container>
        <Container borderRadius boxShadow padding={20} className="payment-history-card container-bg">
          <Flex align="center" gap={24}>
            {PagesIcon}
            <Flex vertical gap={8}>
              <Typography type="h3" text="Pages" />
              <Typography text="130 of 250" />
            </Flex>
          </Flex>
        </Container>
      </Grid>
      <Flex padding={40} vertical gap={32} className="payment-history-listing container-bg">
        <Typography text="Payment History" type="h1" size="lg" />
        <Table columns={columns} data={data} />
      </Flex>
    </Flex>
  )
}

export default PaymentHistory
