import { Control, useWatch } from 'react-hook-form'

import { GoSearch } from 'react-icons/go'
import { WatchIcon } from '@/assets/icons/svgs'

import Flex from '@/components/Flex'
import Input from '@/components/Input'
import Table from '@/components/Table'
import Divider from '@/components/Divider/Divider'
import Container from '@/components/Container/Container'
import Pagination from '@/components/Pagination/Pagination'
import Typography from '@/components/Typography/Typography'
import CircularProgress from '@/components/CircularProgress/CircularProgress'

import { AddSitePayloadTypes } from '@/container/sites/sitesTypes'
import { currencyNumberWithDollar } from '@/utils/helper'

type ColumnTypes = {
  header: string
  dataKey: string
  textAlign?: 'right' | 'center'
  render?: (value: string) => void
}

const AddKeywords = ({ control }: { control: Control<AddSitePayloadTypes> }) => {
  const keywordsData = useWatch({ control, name: 'keywords' })

  const columns: ColumnTypes[] = [
    { header: 'KEYWORD', dataKey: 'keyword' },
    { header: 'CURRENT POSITION', dataKey: 'competition_index' },
    { header: 'MONTHLY SEARCHES', dataKey: 'search_volume' },
    {
      header: 'COST PER CLICK',
      dataKey: 'cpc',
      render: (amount: string) => currencyNumberWithDollar({ value: Number(amount) || 0, showUSD: false }),
    },
    {
      header: 'SCORE',
      dataKey: 'score',
      textAlign: 'center',
      render: (value: string) =>
        value === 'waiting' ? (
          <span style={{ cursor: 'auto' }} className="pointer-icon-stroke">
            {WatchIcon}
          </span>
        ) : (
          <CircularProgress progress={Number(value || 0)} size={30} />
        ),
    },
  ]

  return (
    <Container width={100} borderRadius boxShadow className="add-site-container">
      <Flex vertical gap={32} align="center">
        <Flex vertical gap={16}>
          <Typography text={`Add Your Keywords`} type="h3" />
          <Divider />
          <Typography text="Click on any suggestion to add it to your list of keywords. Don't overthink it, you can always add and and remove keywords" />
          <Typography text="If your site is new or still under construction, the keywords suggestion may not be accurate. Just click 'Next' for now, and we will add more keywords later." />
          <Typography text="You'll be able to add you own (with local targeting) later on, but let's start with these." />
          <Flex vertical gap={32} align="end">
            <Input StartIcon={<GoSearch />} name="search_site" placeholder="Search" />
            <Table columns={columns} data={keywordsData?.slice(0, 10) || []} />
            <Pagination
              pageSize={10}
              currentPage={1}
              totalCount={75}
              onPageChange={() => console.log('onPage Change')}
              showSizeChanger={{
                pageSizeOptions: [
                  { label: '10', id: '10' },
                  { label: '25', id: '25' },
                  { label: '50', id: '50' },
                ],
                onPageSizeChange: () => console.log('page size changing'),
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}

export default AddKeywords
