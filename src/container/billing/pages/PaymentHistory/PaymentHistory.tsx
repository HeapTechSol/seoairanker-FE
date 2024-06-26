import { useEffect } from 'react'

import Chip from '@/components/Chip'
import Flex from '@/components/Flex'
import Table from '@/components/Table'
import Loader from '@/components/Loader'
import Grid from '@/components/Grid/Grid'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import { CrawlIcon, PagesIcon, PersonIcon, SearchIconWithFilledBackground } from '@/assets/icons/svgs'

import useBillingHandling from '@/container/billing/hooks/useBillingHandling'

import { useAppSelector } from '@/api/store'
import { currencyNumberWithDollar, formatUnixDate } from '@/utils/helper'

import './PaymentHistory.scss'

const PaymentHistory = () => {
  const { getBillingHistoryList, billingHistoryLoading, billingHistoryList } = useBillingHandling()

  const userInfo = useAppSelector((state) => state.auth.user?.user)

  const status = {
    succeeded: <Chip circled text="Processed" color="success" />,
    declined: <Chip circled text="Declined" color="error" />,
  }
  const columns = [
    { header: 'Payment ID', dataKey: 'id' },
    { header: 'Date', dataKey: 'period_start', render: (date: number) => formatUnixDate(date) },
    { header: 'Type', dataKey: 'plan' },
    { header: 'Total', dataKey: 'amount', render: (amount: number) => currencyNumberWithDollar({ value: amount || 0, showUSD: false }) },
    {
      header: 'Status',
      dataKey: 'status',
      render: (value: string) => status[value as keyof typeof status],
    },
  ]

  useEffect(() => {
    getBillingHistoryList({ email: userInfo?.email as string, limit: 1000, starting_after: null })
  }, [])

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
        <Table columns={columns} data={billingHistoryList?.payments || []} />
      </Flex>
      <Loader loading={billingHistoryLoading} />
    </Flex>
  )
}

export default PaymentHistory
