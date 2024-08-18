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
import { currencyNumberWithDollar, formatDate, handleFormatCurrencyAndNumber } from '@/utils/helper'

import './PaymentHistory.scss'
import { ColumnType } from '@/components/Table/types'
import { PaymentHistoryResponseTypes } from '../../billingTypes'

const PaymentHistory = () => {
  const { getBillingHistoryList, billingHistoryLoading, billingHistoryList, userQuotaLoading } = useBillingHandling()

  const userQuota = useAppSelector((state) => state.billing.userQuota)

  const status = {
    succeeded: <Chip circled text="Processed" color="success" />,
    declined: <Chip circled text="Declined" color="error" />,
  }

  const columns: ColumnType<PaymentHistoryResponseTypes>[] = [
    { header: 'Payment ID', dataKey: 'stripe_transaction_id', render: (text: string) => text || '-' },
    { header: 'Date', dataKey: 'payment_date', render: (date: string) => formatDate(date) },
    { header: 'Type', dataKey: 'payment_method' },
    { header: 'Total', dataKey: 'amount', render: (amount: number) => currencyNumberWithDollar({ value: amount || 0, showUSD: false }) },
    {
      header: 'Status',
      dataKey: 'status',
      render: (value: string) => status[value as keyof typeof status],
    },
  ]

  useEffect(() => {
    getBillingHistoryList({ limit: 1000, starting_after: null })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Flex vertical gap={40}>
      <Grid>
        <Container borderRadius boxShadow padding={20} className="payment-history-card container-bg">
          <Flex align="center" gap={24}>
            {PersonIcon}
            <Flex vertical gap={8}>
              <Typography type="h3" text="Team Members" />
              <Typography
                text={`${handleFormatCurrencyAndNumber({ value: userQuota?.remaining_team_members_quota || 0 })} of ${handleFormatCurrencyAndNumber({
                  value: userQuota?.total_team_members_quota || 0,
                })}`}
              />
            </Flex>
          </Flex>
        </Container>
        <Container borderRadius boxShadow padding={20} className="payment-history-card container-bg">
          <Flex align="center" gap={24}>
            {CrawlIcon}
            <Flex vertical gap={8}>
              <Typography type="h3" text="Site Crawls" />
              <Typography
                text={`${handleFormatCurrencyAndNumber({ value: userQuota?.remaining_sites_quota || 0 })} of ${handleFormatCurrencyAndNumber({
                  value: userQuota?.total_sites_quota || 0,
                })}`}
              />
            </Flex>
          </Flex>
        </Container>
        <Container borderRadius boxShadow padding={20} className="payment-history-card container-bg">
          <Flex align="center" gap={24}>
            {SearchIconWithFilledBackground}
            <Flex vertical gap={8}>
              <Typography type="h3" text="Keyword Searches" />
              <Typography
                text={`${handleFormatCurrencyAndNumber({ value: userQuota?.remaining_keywords_quota || 0 })} of ${handleFormatCurrencyAndNumber({
                  value: userQuota?.total_keywords_quota || 0,
                })}`}
              />
            </Flex>
          </Flex>
        </Container>
        <Container borderRadius boxShadow padding={20} className="payment-history-card container-bg">
          <Flex align="center" gap={24}>
            {PagesIcon}
            <Flex vertical gap={8}>
              <Typography type="h3" text="Pages" />
              <Typography
                text={`${handleFormatCurrencyAndNumber({ value: userQuota?.remaining_pages_quota || 0 })} of ${handleFormatCurrencyAndNumber({
                  value: userQuota?.total_pages_quota || 0,
                })}`}
              />
            </Flex>
          </Flex>
        </Container>
      </Grid>
      <Flex padding={40} vertical gap={32} className="payment-history-listing container-bg">
        <Typography text="Payment History" type="h1" size="lg" />
        <Table columns={columns} data={billingHistoryList || []} />
      </Flex>
      <Loader loading={billingHistoryLoading || userQuotaLoading} />
    </Flex>
  )
}

export default PaymentHistory
