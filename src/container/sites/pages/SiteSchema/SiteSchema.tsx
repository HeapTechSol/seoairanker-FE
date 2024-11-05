import { MdClear } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { AiOutlineGlobal } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'

import Flex from '@/components/Flex'
import Loader from '@/components/Loader'
import Select from '@/components/Select'
import Button from '@/components/Button'
import Checkbox from '@/components/Checkbox'
import Divider from '@/components/Divider/Divider'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import SearchInput from '@/components/SearchInput/SearchInput'
import SchemaPreview from '@/container/sites/components/SchemaPreview/SchemaPreview'

import { useAppSelector } from '@/api/store'
import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'
import useSchemaRecommendations from '@/container/sites/hooks/useSchemaRecommendations'
import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

import { EXACT_ROUTES } from '@/constant/routes'
import { SchemaTypes } from '@/container/sites/sitesTypes'
import { classMapper, formatDate, uniqBy } from '@/utils/helper'

import './SiteSchema.scss'

const { SITE_DETAILS_PAGE } = EXACT_ROUTES

const SiteSchema = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [link_id, setLink_id] = useState<string>('')
  const [queryText, setQueryText] = useState<string>('')
  const [durationValue, setDurationValue] = useState<string | string[]>('')
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [selectedKey, setSelectedKey] = useState<string>('')
  const [selectedLabel, setSelectedLabel] = useState<string>('')

  const crawledInfo = useAppSelector((state) => state.sites.crawledInfo)
  const schemaPagesTypeList = useAppSelector((state) => state.sites.schemaPagesTypeList)

  const { getSchemaPages, getSchemaPagesListTypes } = useSchemaRecommendations()
  const { reCrawlLoading, handleReCrawlSite } = useHandleRecommendations()
  const { getSiteCrawledInfoData, getSchemaTypesData, schemaTypesLoading, schemaTypesData, approveSchema, approveSchemaLoading } =
    useHandleSitesLogic()

  const reCrawlSite = () => {
    if (id && crawledInfo.site_data?.site_url) handleReCrawlSite({ site_id: id || '', siteUrl: crawledInfo.site_data?.site_url })
  }

  const handleSchemaSelection = (selected: boolean, item: SchemaTypes) => {
    if (selected) {
      const updatedKeys = uniqBy([...selectedKeys, item.label], (item) => item)
      setSelectedKeys(updatedKeys)
    } else {
      const updatedKeys = selectedKeys?.filter((key) => key !== item?.label)
      setSelectedKeys(updatedKeys)
    }
  }

  const handleSelectResult = async (result: { id: string | number; label: string }) => {
    console.log(result)
  }

  const handleClearFilters = async (isFilterApplied: boolean) => {
    setQueryText('')
    if (isFilterApplied) {
      setLink_id('')
    }
  }

  const handleSearch = async (query: string) => {
    console.log(query)
    return Promise.resolve([])
  }

  const handleSelectSchemaPageType = async (pageType: string, label: string) => {
    setSelectedKey(pageType)
    setSelectedLabel(label)
    await getSchemaPages({ page: 1, per_page: 10, type: pageType || '', link_id: link_id })
  }

  const pagesData = schemaTypesData?.schema?.filter((item) => item.label !== 'Unknown')

  const getSchemaDataFirstCall = async () => {
    const data = await getSchemaPagesListTypes({ link_id: '', site_id: id || '' })
    setSelectedKey(data?.schema_type || '')
    setSelectedLabel(data?.label || '')
    await getSchemaPages({ page: 1, per_page: 10, type: data?.schema_type || '', link_id: '' })
  }

  useEffect(() => {
    setSelectedKeys(pagesData?.filter((item) => item.selected)?.map((item) => item.label) || [])
    setDurationValue(schemaTypesData?.crawl_interval || '')
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schemaTypesData])

  useEffect(() => {
    getSchemaDataFirstCall()
    if (id) getSiteCrawledInfoData({ site_id: id })
    if (id) getSchemaTypesData({ id })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container className="add-new-keywords-container ">
      <Flex vertical gap={16}>
        <Loader loading={reCrawlLoading || schemaTypesLoading} />
        <Typography text={crawledInfo?.site_data?.site_url || ''} type="h1" />
        <Divider color="primary" />
        <Flex vertical gap={16}>
          <Container width={100} borderRadius boxShadow className="site-schema-page container-bg">
            <Flex vertical gap={16}>
              <Typography text="Schema Markup Automation" type="h2" />
              <Typography
                text={`Below is the list of AI Schema Markup Categories for ${
                  crawledInfo?.site_data?.site_url || ''
                } that can be implemented automatically. First review Schema Markup, and then click Approve to deploy changes automatically. You can approve or unapprove changes across your entire site or to individual pages by clicking the Category titles.`}
              />
            </Flex>
          </Container>
          <Container width={100} borderRadius boxShadow className="site-schema-page container-bg">
            <Flex vertical gap={16}>
              <Typography text="Settings" type="h2" />
              <Select
                Options={[
                  { label: 'Daily', id: 'daily' },
                  { label: 'Weekly', id: 'weekly' },
                  { label: 'Monthly', id: 'monthly' },
                  { label: 'Annually', id: 'annually' },
                  { label: 'Team Default (Daily)', id: 'daily' },
                ]}
                title={`How often would you like to crawl ${crawledInfo?.site_data?.site_url || ''}?`}
                placeholder="Schedule"
                titlePosition="top"
                setValues={setDurationValue}
                values={durationValue}
                size="md"
              />
              <Typography text={`Limit page types to generate schemas for:`} />
              <Flex vertical gap={8}>
                {!pagesData?.length ? (
                  <Typography text="We are generating schema, Once you will got the email that we are done with recommendations, setting for schema will be enabled" />
                ) : (
                  <>
                    {pagesData?.map((item, index) => (
                      <Flex align="center" gap={8} key={`${index}${item.label}`}>
                        <Checkbox
                          name="article"
                          onChange={(e) => handleSchemaSelection((e.target as HTMLInputElement).checked, item)}
                          label={item?.label || ''}
                          labelPosition="right"
                          borderRadius
                          checked={selectedKeys.includes(item.label)}
                        />
                        <Typography
                          text={
                            <>
                              {/* /sites/site-detail/1?tab=pages */}
                              (
                              <Typography
                                text={`${item?.count || 0} pages`}
                                link
                                inline
                                color="info"
                                onClick={() => navigate(`${SITE_DETAILS_PAGE}/${id}?tab=pages&schema_type=${item.label}`)}
                              />
                              )
                            </>
                          }
                        />
                      </Flex>
                    ))}
                  </>
                )}
              </Flex>
              <Typography text={`Leave blank to generate schemas for all pages where it is missing (default).`} />
            </Flex>
            <Divider margin={24} />
            <Button
              
              loading={approveSchemaLoading}
              disabled={!selectedKeys?.length}
              onClick={() => approveSchema({ id: id || '', schema_types: selectedKeys, crawl_interval: durationValue as string })}
            >
              Save Changes
            </Button>
          </Container>

          {selectedLabel && (
            <>
              <Container padding={'40px 20px'} className="container-bg" borderRadius boxShadow>
                <Flex vertical gap={16}>
                  <Typography text="Search Schema Markup by Page URL" type="h2" />
                  <SearchInput
                    type="text"
                    value={queryText}
                    StartIcon={<AiOutlineGlobal />}
                    onSearch={handleSearch}
                    name="search_automation"
                    handleClearSelection={handleClearFilters}
                    onEnterPress={handleSearch}
                    ClearSearchIcon={<MdClear />}
                    onSelectResult={handleSelectResult}
                    placeholder="Enter Page URL or Path"
                    onChange={(e) => setQueryText(e.target.value)}
                  />
                </Flex>
              </Container>

              <Flex gap={16}>
                <Container width={30} padding={'40px 20px'} borderRadius boxShadow className="recommendations-container container-bg">
                  <Flex vertical gap={2}>
                    {schemaPagesTypeList?.map((schema) =>
                      schema.count ? (
                        <Flex
                          justify="between"
                          padding={'5px 15px'}
                          key={schema.schema_type}
                          className={classMapper('recommendations-status', { active: schema.schema_type === selectedKey })}
                          onClick={() => handleSelectSchemaPageType(schema.schema_type, schema.label)}
                        >
                          <Typography text={schema.label} />
                          <Typography text={`(${schema?.count})`} />
                        </Flex>
                      ) : null
                    )}
                  </Flex>
                  {/* <Button fullWidth variant="outlined" color="success" disabled={false} loading={false} onClick={() => null}>
                Approve All
              </Button>
              {!!crawledInfo?.site_data?.total_approved && (
                <Button fullWidth variant="outlined" color="error" disabled={false} loading={false} onClick={() => null}>
                  Reject All
                </Button>
              )} */}
                </Container>
                <SchemaPreview link_id="" selectedKey={selectedKey || ''} selectedLabel={selectedLabel} />
              </Flex>
            </>
          )}
          {!selectedLabel && (
            <Container width={100} borderRadius boxShadow className="site-schema-page container-bg">
              <Flex vertical gap={16}>
                <Typography text="Nothing Here Just Yet" type="h2" />
                <Typography text={`Schema Markup, if any, will appear here after the next recrawl.`} />
                <Typography
                  text={
                    <>
                      The next crawl is scheduled on {formatDate(crawledInfo?.site_data?.next_crawl || '')}. You can also force{' '}
                      <Typography text="recrawl now." link inline color="info" onClick={reCrawlSite} />
                    </>
                  }
                />
              </Flex>
            </Container>
          )}
        </Flex>
      </Flex>
    </Container>
  )
}

export default SiteSchema
