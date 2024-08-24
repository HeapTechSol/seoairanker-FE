import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Flex from '@/components/Flex'
import Table from '@/components/Table'
import Loader from '@/components/Loader'
import Button from '@/components/Button'
import Tooltip from '@/components/Tooltip'
import Divider from '@/components/Divider/Divider'
import TruncateText from '@/components/TruncateText'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import Pagination from '@/components/Pagination/Pagination'

import { rowSelectionHandler } from '@/components/Table/helper'

import { useAppSelector } from '@/api/store'
import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'
import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

import { LuRefreshCcw } from 'react-icons/lu'
import { MdBlock } from 'react-icons/md'

import { ColumnType } from '@/components/Table/types'
import { SiteLinksDataTypes } from '@/container/sites/sitesTypes'

import './SitePages.scss'

const SitePages = () => {
  const { id: siteId } = useParams()
  const [selectedRowKeys, SetSelectedRowKeys] = useState<string[]>([])
  const [editedId, setEditedId] = useState<string>('')

  const { handleGetSiteLinks, siteLinks, siteLinksLoading } = useHandleSitesLogic()
  const { reCrawlPageLoading, handleReCrawlSitePage } = useHandleRecommendations()

  const crawledInfo = useAppSelector((state) => state.sites.crawledInfo)
  const isGetSiteDataPending = useAppSelector((state) => state.sites.isGetSiteDataPending)

  const PAGES_COLUMN: ColumnType<SiteLinksDataTypes>[] = [
    {
      header: 'PATH',
      dataKey: 'url',
      render: (text) => <TruncateText text={text} line={1} width={200}></TruncateText>,
    },
    // { header: 'DEPTH' },
    {
      header: 'Lang',
      dataKey: 'page_language',
    },
    {
      header: 'Last Crawl',
      dataKey: 'last_crawled',
    },
    {
      header: 'WIDGET',
      textAlign: 'center',
      render: () => (
        <Tooltip content="Looks like widgets is not installed on this page">
          <Button StartIcon={<MdBlock />} onlyIcon noPadding variant="text" color="error" />
        </Tooltip>
      ),
    },
    {
      header: 'ACTIONS',
      textAlign: 'center',
      render: (_, row) => (
        <>
          {editedId === row.id && reCrawlPageLoading ? (
            <Loader loading overlay={false} size={24} />
          ) : (
            <Flex gap={12} align="center" justify="center">
              {/* <Button StartIcon={<LuEye />} onlyIcon noPadding variant="text" color="info" /> */}
              <Button
                StartIcon={<LuRefreshCcw />}
                onlyIcon
                noPadding
                variant="text"
                color="info"
                onClick={async () => {
                  setEditedId(row.id)
                  await handleReCrawlSitePage({ site_id: siteId || '', link_id: row.id })
                }}
                loading={editedId === row.id && reCrawlPageLoading}
              />
              {/* <Button StartIcon={<MdOutlineWbSunny />approveRecommendationsLoading} onlyIcon noPadding variant="text" color="info" /> */}
            </Flex>
          )}
        </>
      ),
    },
  ]

  const onPageChange = (pageNumber: number) => {
    handleGetSiteLinks({
      site_id: siteId as string,
      page: pageNumber,
      per_page: siteLinks?.per_page || 10,
    })
  }

  const handlePerPageItems = (perPageItems: string) => {
    handleGetSiteLinks({
      site_id: siteId as string,
      page: 1,
      per_page: Number(perPageItems),
    })
  }

  useEffect(() => {
    handleGetSiteLinks({
      site_id: siteId as string,
      page: 1,
      per_page: 10,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container className="site-pages-container">
      <Flex vertical gap={16}>
        <Typography text={`Pages on ${crawledInfo?.site_data?.site_url || ''}`} type="h1" />
        <Divider color="primary" />
        <Flex gap={16} className="container-screens">
          <Container borderRadius boxShadow padding={'40px'} className="site-pages-table-container  container-bg" width={100}>
            <Flex vertical gap={16}>
              <Typography text="Found Pages" type="h2" />
              <Typography
                text={`We routinely crawl ${
                  crawledInfo?.site_data?.site_url || ''
                } in order to understand your site structure and to better identify potential SEO improvements. Here are the pages we found. Click the toggle icon to ignore pages on future crawls.`}
              />
              <Typography text={`You have approved 1 recommendation. Click any link below to see them live.`} />
              <Typography text={`Status: completed (last crawled 3 days ago)`} />
              <Divider color="primary" />
              <Table
                columns={PAGES_COLUMN}
                data={siteLinks?.data || []}
                style={{
                  tableCellStyle: {
                    fontSize: '14px',
                  },
                  tableHeadingStyle: {
                    fontSize: '10.5px',
                  },
                }}
                onRowSelection={{
                  type: 'checkbox',
                  selectedRowKeys,
                  onChange: (newSelectedKeys: string | string[]) => {
                    SetSelectedRowKeys((prev) => rowSelectionHandler(prev, newSelectedKeys))
                  },
                }}
                rowKey="id"
              />
              <Pagination
                pageSize={siteLinks?.per_page || 10}
                currentPage={siteLinks?.page || 1}
                totalCount={siteLinks?.total_count || 0}
                onPageChange={onPageChange}
                showSizeChanger={{
                  pageSizeOptions: [
                    { label: '10', id: '10' },
                    { label: '25', id: '25' },
                    { label: '50', id: '50' },
                  ],
                  onPageSizeChange: (val) => handlePerPageItems(val),
                }}
              />
            </Flex>
          </Container>
        </Flex>
      </Flex>
      <Loader loading={siteLinksLoading || isGetSiteDataPending} />
    </Container>
  )
}

export default SitePages
