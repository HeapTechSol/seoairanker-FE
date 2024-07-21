import { useEffect, useState } from 'react'
import { Controller, useWatch } from 'react-hook-form'

import Flex from '@/components/Flex'
import Table from '@/components/Table'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import Select from '@/components/Select'
import Checkbox from '@/components/Checkbox'
import Divider from '@/components/Divider/Divider'
import TextArea from '@/components/TextArea/TextArea'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import Pagination from '@/components/Pagination/Pagination'
import CountryFlag from '@/components/CountryFlag/CountryFlag'

import useAddNewKeyword from '@/container/sites/hooks/useAddNewKeyword'
import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'

import languages from '@/constant/languages'
import { CiLocationOn } from 'react-icons/ci'
import { KEYWORDS_COLUMN } from '@/container/sites/utils'
import { rowSelectionHandler } from '@/components/Table/helper'

import './AddNewKeywords.scss'
import { useAppSelector } from '@/api/store'

const AddNewKeywords = () => {
  const [selectedKeys, SetSelectedKeys] = useState<number[]>([])

  const { getKeywords, keywordsData, keywordsLoading } = useHandleSitesLogic()
  const { control, setValue, getValues, handleSaveKeywords, isLoading, handleClearKeywordData } = useAddNewKeyword()

  const keywords = keywordsData?.data?.filter((item) => selectedKeys?.includes(item.id))
  const filteredData = keywordsData?.data?.filter((item) => !selectedKeys.includes(item.id))

  const isLocal = useWatch({ control, name: 'track_local' })

  const crawledInfo = useAppSelector(state=>state.sites.crawledInfo)

  const onPageChange = (pageNumber: number) => {
    getKeywords({
      site_id: String(crawledInfo?.site_data?.id) || '',
      page: pageNumber,
      per_page: keywordsData?.per_page || 10,
    })
  }

  const handlePerPageItems = (perPageItems: string) => {
    getKeywords({
      site_id: String(crawledInfo?.site_data?.id) || '',
      page: 1,
      per_page: Number(perPageItems) || 10,
    })
  }

  const clearFormData = () => {
    SetSelectedKeys([])
    handleClearKeywordData()
  }

  useEffect(() => {
    const updatedKeywords = () => {
      const textAreaKeywords = getValues('keywords')
      const newKeywords = keywords?.map((item) => item.keyword) || []
      const existingKeywords = textAreaKeywords.split('\n').filter((k) => k.trim() !== '')
      const manualKeywords = existingKeywords.filter(
        (keyword) => !keywordsData?.data?.some((item) => item.keyword === keyword && !selectedKeys.includes(item.id))
      )
      const combinedKeywords = [...new Set([...manualKeywords, ...newKeywords])]
      return combinedKeywords.join('\n')
    }

    setValue('keywords', updatedKeywords())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywords])

  useEffect(() => {
    getKeywords({
      site_id: String(crawledInfo?.site_data?.id) || '',
      page: 1,
      per_page: 10,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container className="add-new-keywords-container ">
      <Flex vertical gap={16}>
        <Typography text="Add New Keywords" type="h1" />
        <Divider color="warning" />
        <Flex gap={16} className="container-screens">
          <Container borderRadius boxShadow padding={'40px'} className="recommended-keywords-table-container container-bg">
            <Flex vertical align="start" gap={16} className="keywords-table-container">
              <Typography text="Your Recommended Keywords" type="h2" />
              <Typography
                text={`Seode found these keywords for your site. Click on a keyword to add it to your keyword box. Once you're done selecting your target keywords, click the "Save Your Keywords" button to save your keywords.`}
              />
              <Divider color="warning" />

              <Table
                columns={KEYWORDS_COLUMN}
                data={filteredData || []}
                style={{
                  tableCellStyle: { fontSize: '14px' },
                  tableHeadingStyle: { fontSize: '10.5px' },
                }}
                onRowClick={(newSelectedKeys: number[]) => {
                  SetSelectedKeys(rowSelectionHandler(selectedKeys, newSelectedKeys))
                  if (filteredData?.length === 1) {
                    onPageChange((keywordsData?.page || 0) + 1)
                  }
                }}
                rowKey="id"
              />

              <Pagination
                pageSize={keywordsData?.per_page || 10}
                currentPage={keywordsData?.page || 1}
                totalCount={keywordsData?.total || 0}
                onPageChange={onPageChange}
                showSizeChanger={{
                  pageSizeOptions: [
                    { label: '10', id: '10' },
                    { label: '25', id: '25' },
                    { label: '50', id: '50' },
                  ],
                  onPageSizeChange: handlePerPageItems,
                }}
              />
            </Flex>
          </Container>
          <Container borderRadius boxShadow padding={'40px'} className="manual-keywords-form container-bg">
            <Flex vertical gap={16}>
              <Typography text="Save Your Keywords" type="h2" />
              <Typography
                text={`Click "Save Your Keywords" button below to add your chosen keywords. You can also type in any other keywords you want to rank for.`}
              />

              <Controller
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextArea
                    onChange={onChange}
                    value={value}
                    name="keywords"
                    error={error?.message}
                    borderRadius
                    title="Keyword"
                    placeholder="One keyword per line, maximum 10 words per keyword. Please avoid special characters, punctuation, and emoji."
                  />
                )}
                name="keywords"
                control={control}
              />

              <Controller
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CountryFlag label="Country" placeholder="Country" value={value} onChange={onChange} error={error?.message} />
                )}
                name="country"
                control={control}
              />

              <Controller
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Select
                    Options={languages?.map((lang) => ({
                      label: `${lang.name} (${lang.code})`,
                      id: lang.code,
                    }))}
                    title="Language"
                    placeholder="Language"
                    titlePosition="top"
                    setValues={onChange}
                    searchable
                    values={value}
                    error={error ? error.message : ''}
                    size="md"
                  />
                )}
                name="language"
                control={control}
              />

              <Controller
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Select
                    Options={[
                      { label: 'Daily', id: 'daily' },
                      { label: 'Weekly', id: 'weekly' },
                      { label: 'Monthly', id: 'monthly' },
                      { label: 'Annually', id: 'annually' },
                      { label: 'Team Default (Daily)', id: 'daily' },
                    ]}
                    title="How often would you like to refresh ranking stats for this keyword?"
                    placeholder="Schedule"
                    titlePosition="top"
                    setValues={onChange}
                    values={value}
                    size="md"
                    error={error ? error.message : ''}
                  />
                )}
                name="refresh_frequency"
                control={control}
              />

              <Controller
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    name="track_local"
                    label="Track Local Results"
                    borderRadius
                    size="sm"
                    labelPosition="right"
                    onChange={onChange}
                    checked={value as boolean}
                  />
                )}
                name="track_local"
                control={control}
              />

              {isLocal && (
                <Controller
                  render={({ field: { onChange, value } }) => (
                    <Input
                      StartIcon={<CiLocationOn />}
                      onChange={onChange}
                      value={value}
                      name="track_local_value"
                      placeholder="Enter a location or zip code"
                    />
                  )}
                  name="track_local_value"
                  control={control}
                />
              )}
              <Divider color="common" />
              <Flex gap={16}>
                <Button onClick={handleSaveKeywords} type="borderRadius" size="sm" loading={isLoading}>
                  Save Your Keywords
                </Button>
                <Button onClick={clearFormData} variant="text" type="borderRadius" size="sm">
                  Cancel
                </Button>
              </Flex>
            </Flex>
          </Container>
        </Flex>
      </Flex>
      <Loader loading={keywordsLoading} overlay />
    </Container>
  )
}

export default AddNewKeywords
