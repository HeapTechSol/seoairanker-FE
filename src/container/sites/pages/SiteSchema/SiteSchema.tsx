import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Flex from '@/components/Flex'
import Loader from '@/components/Loader'
import Button from '@/components/Button'
import Checkbox from '@/components/Checkbox'
import Divider from '@/components/Divider/Divider'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import { useAppSelector } from '@/api/store'
import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'
import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

import { uniqBy } from '@/utils/helper'
import { SchemaTypes } from '@/container/sites/sitesTypes'

import './SiteSchema.scss'

const SiteSchema = () => {
  const { id } = useParams()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const crawledInfo = useAppSelector((state) => state.sites.crawledInfo)

  const { getSiteCrawledInfoData, getSchemaTypesData, schemaTypesLoading, schemaTypesData, approveSchema, approveSchemaLoading } =
    useHandleSitesLogic()
  const { reCrawlLoading, handleReCrawlSite } = useHandleRecommendations()

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

  const isUnKnownExits = schemaTypesData?.some((item) => item.label === 'Unknown')

  useEffect(() => {
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
              <Typography text={`Limit page types to generate schemas for:`} />
              <Flex vertical gap={8}>
                {isUnKnownExits ? (
                  <Typography text="We are generating schema, Once you will got the email that we are done with recommendations, setting for schema will be enabled" />
                ) : (
                  <>
                    {schemaTypesData?.map((item, index) => (
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
                              (<Typography text={`${item?.count || 0} pages`} link inline color="info" />)
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
              type="borderRadius"
              loading={approveSchemaLoading}
              disabled={!selectedKeys?.length}
              onClick={() => approveSchema({ id: id || '', schema_types: selectedKeys })}
            >
              Save Changes
            </Button>
          </Container>
          <Container width={100} borderRadius boxShadow className="site-schema-page container-bg">
            <Flex vertical gap={16}>
              <Typography text="Nothing Here Just Yet" type="h2" />
              <Typography text={`Schema Markup, if any, will appear here after the next recrawl.`} />
              <Typography
                text={
                  <>
                    The next crawl is scheduled on Sun, 18 Aug 2024. You can also force{' '}
                    <Typography text="recrawl now." link inline color="info" onClick={reCrawlSite} />
                  </>
                }
              />
            </Flex>
          </Container>
        </Flex>
      </Flex>
    </Container>
  )
}

export default SiteSchema
