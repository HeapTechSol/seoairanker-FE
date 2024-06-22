import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Flex from '@/components/Flex'
import Table from '@/components/Table'
import Button from '@/components/Button'
import Tooltip from '@/components/Tooltip'
import Divider from '@/components/Divider/Divider'
import TruncateText from '@/components/TruncateText'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import Pagination from '@/components/Pagination/Pagination'

import { rowSelectionHandler } from '@/components/Table/helper'

import { ColumnsTypes } from '@/components/Table/types'
import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'
import { BlockIcon, EyeIcon, ReloadIcon, SunLight } from '@/assets/icons/svgs'

import './SitePages.scss'

const SitePages = () => {
  const { state } = useLocation()
  const [selectedRowKeys, SetSelectedRowKeys] = useState<string[]>([])

  const { getSiteLinks, siteLinkAndContent } = useHandleSitesLogic()

  const PAGES_COLUMN: ColumnsTypes[] = [
    {
      header: 'PATH',
      dataKey: 'url',
      sortKey: 'url',
      render: (text) => <TruncateText text={text} line={1} width={200}></TruncateText>,
    },
    { header: 'DEPTH', dataKey: 'depth', sortKey: 'depth' },
    {
      header: 'Lang',
      dataKey: 'lang',
      sortKey: 'lang',
    },
    {
      header: 'Last Crawl',
      dataKey: 'date',
      sortKey: 'date',
    },
    {
      header: 'WIDGET',
      dataKey: 'widget',
      sortKey: 'widget',
      textAlign: 'center',
      render: () => (
        <Tooltip content="Looks like widgets is not installed on this page">
          <Button StartIcon={BlockIcon} onlyIcon noPadding variant="text" color="error" />
        </Tooltip>
      ),
    },
    {
      header: 'ACTIONS',
      dataKey: 'widget',
      textAlign: 'center',
      render: () => (
        <Flex gap={12} align="center" justify="center">
          <Button StartIcon={EyeIcon} onlyIcon noPadding variant="text" color="info" />
          <Button StartIcon={ReloadIcon} onlyIcon noPadding variant="text" color="info" fill />
          <Button StartIcon={SunLight} onlyIcon noPadding variant="text" color="info" />
        </Flex>
      ),
    },
  ]

  const onPageChange = (pageNumber: number) => {
    getSiteLinks({
      site_id: state?.siteId as string,
      page: pageNumber,
      per_page: siteLinkAndContent?.pagination?.per_page || 10,
      sort_by: 'url',
      sort_order: 'asc',
      search: '',
    })
  }

  const handlePerPageItems = (perPageItems: string) => {
    getSiteLinks({
      site_id: state?.siteId as string,
      page: 1,
      per_page: Number(perPageItems),
      sort_by: 'url',
      sort_order: 'asc',
      search: '',
    })
  }

  useEffect(() => {
    getSiteLinks({
      site_id: state?.siteId as string,
      page: 1,
      per_page: 10,
      sort_by: 'url',
      sort_order: 'asc',
      search: '',
    })
  }, [])

  return (
    <Container className="site-pages-container">
      <Flex vertical gap={16}>
        <Typography text={`Pages on ${state?.siteUrl || ''}`} type="h1" />
        <Divider color="warning" />
        <Flex gap={16} className="container-screens">
          <Container borderRadius boxShadow padding={'40px'} className="site-pages-table-container  container-bg" width={100}>
            <Flex vertical gap={16}>
              <Typography text="Found Pages" type="h2" />
              <Typography
                text={`We routinely crawl ${state?.siteUrl || ''} in order to understand your site structure and to better identify potential SEO improvements. Here are the pages we found. Click the toggle icon to ignore pages on future crawls.`}
              />
              <Typography text={`You have approved 1 recommendation. Click any link below to see them live.`} />
              <Typography text={`Status: completed (last crawled 3 days ago)`} />
              <Divider color="warning" />
              <Table
                columns={PAGES_COLUMN}
                data={siteLinkAndContent?.result || []}
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
                rowKey="url"
              />
              <Pagination
                pageSize={siteLinkAndContent?.pagination?.per_page || 10}
                currentPage={siteLinkAndContent?.pagination?.current_page || 1}
                totalCount={siteLinkAndContent?.pagination?.total_items as number}
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
    </Container>
  )
}

export default SitePages
