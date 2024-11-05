import { useParams } from 'react-router-dom'
import { FocusEvent, SyntheticEvent, useEffect, useRef, useState } from 'react'

import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Accordion from '@/components/Accordion'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import ShimmerPlaceholder from '@/components/RadarLoader/ShimmerPlaceholder'

import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'
import useSchemaRecommendations from '@/container/sites/hooks/useSchemaRecommendations'

import { sitesAPI } from '../../api/sitesAPI'
import { EditIcon } from '@/assets/icons/svgs'
import { SitePagesSchemaTypes } from '@/container/sites/sitesTypes'
import { store, useAppSelector } from '@/api/store'

const SchemaPreview = ({ link_id: externalLinkId, selectedKey, selectedLabel }: { link_id: string; selectedKey: string; selectedLabel: string }) => {
  const { id: siteId } = useParams()
  const [editedId, setEditedId] = useState<string>('')
  const editableRefs = useRef<(HTMLElement | null)[]>([])

  const { getSiteCrawledInfoData } = useHandleSitesLogic()
  const {
    schemaPagesData,
    getSchemaPages,
    schemaPagesLoading,
    handleUpdateSchemaStatus,
    isSingleApproveLoading,
    isSubBulkApproveLoading,
    schemaPagesTypesLoading,
  } = useSchemaRecommendations()

  const isApproveAPICallInProgress = useAppSelector((state) => state.sites.isApproveAPICallInProgress)

  const isApproved = schemaPagesData?.total === schemaPagesData?.approved

  const handleAllRecommendations = async () => {
    if (siteId) {
      await handleUpdateSchemaStatus({
        schemaType: selectedKey,
        entryId: '',
        bulk: true,
        approved: true,
        website_id: siteId,
      })
      getSiteCrawledInfoData({ site_id: siteId, link_id: externalLinkId })
      getSchemaPages({ page: 1, per_page: 10, type: selectedKey, link_id: externalLinkId })
    }
  }

  const onApprove = async (e: SyntheticEvent, type_id: string, linkId: string, status: boolean) => {
    setEditedId(type_id)
    e.stopPropagation()
    if (siteId) {
      await handleUpdateSchemaStatus({
        schemaType: selectedKey,
        entryId: type_id,
        bulk: false,
        link_id: linkId,
        approved: status,
        website_id: siteId,
      })
      getSiteCrawledInfoData({ site_id: siteId, link_id: externalLinkId })
      getSchemaPages({ page: 1, per_page: 10, type: selectedKey, link_id: externalLinkId })
    }
  }

  const editSuggestionHandler = (index: number, id: string) => {
    setEditedId(id)
    const element = editableRefs.current[index]
    if (element) {
      element.setAttribute('contentEditable', 'true')
      element.focus()
      const range = document.createRange()
      range.selectNodeContents(element)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
    }
  }

  const handleBlur = async (e: FocusEvent<HTMLElement>, type_id: string, index: number, currentText: string, linkId: string) => {
    const text = e.target.innerText
    if (siteId && currentText != text) {
      await handleUpdateSchemaStatus({
        schemaType: selectedKey,
        entryId: type_id,
        bulk: true,
        approved: true,
        link_id: linkId,
        website_id: siteId,
      })
      getSiteCrawledInfoData({ site_id: siteId, link_id: externalLinkId })
      getSchemaPages({ page: 1, per_page: 10, type: selectedKey, link_id: externalLinkId })
    }
    const element = editableRefs.current[index]
    element?.setAttribute('contentEditable', 'false')
  }

  const isLoadMore = (schemaPagesData?.total || 0) > (schemaPagesData?.data?.length || 0)

  const handleLoadMore = () => {
    getSchemaPages({ page: (schemaPagesData?.page || 0) + 1, per_page: 10, type: selectedKey, link_id: externalLinkId })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const afterCached = sitesAPI.endpoints.getRecommendationsByType.select({
        site_id: siteId || '',
        link_id: externalLinkId,
        page: 1,
        per_page: 10,
        type: 'page_schemas',
      })(store.getState())
      if (afterCached?.status === 'fulfilled') {
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalLinkId])

  const renderAccordionDescription = (item: SitePagesSchemaTypes, index: number) => (
    <Flex vertical gap={4}>
      <Flex align="center" gap={16}>
        <Typography text="Suggestion:" />
        <span style={{ cursor: 'pointer' }} className="pointer-icon-fill" onClick={() => editSuggestionHandler(index, item.id)}>
          {EditIcon}
        </span>
      </Flex>
      <Typography
        color="warning"
        text={item?.generated_schema}
        contentEditable={item.id === editedId}
        onBlur={(e) => handleBlur(e, item.id, index, item?.generated_schema, item.link_path)}
        ref={(el) => (editableRefs.current[index] = el)}
      />
    </Flex>
  )

  const optimizedTitlesList = (schemaPagesData?.data as SitePagesSchemaTypes[])?.map((item, index) => ({
    url: item?.url,
    link_id: item.link_id,
    content: renderAccordionDescription(item, index),
    approve: item.approved,
    id: item.id,
  }))

  return (
    <Container borderRadius boxShadow width={70} className="recommendation-list-container container-bg">
      <ShimmerPlaceholder loading={schemaPagesLoading || schemaPagesTypesLoading}>
        <Flex vertical gap={16}>
          <Flex align="start" padding="40px 40px 0px 40px">
            <Flex vertical gap={16}>
              <Typography type="h3" text={selectedLabel || ''} />
              <Typography text={`This category has ${schemaPagesData?.total} customizations. Click to edit`} />
            </Flex>
            <Button
              size="sm"
              variant="outlined"
              type="borderRadius"
              color="success"
              disabled={isApproved || isApproveAPICallInProgress}
              loading={isSubBulkApproveLoading}
              onClick={handleAllRecommendations}
            >
              Approve All ({schemaPagesData?.approved || 0}/{schemaPagesData?.total || 0})
            </Button>
          </Flex>
          <Flex justify="center" align="center" wrap gap={8} className="preview-details-list" padding="0px 40px 40px 40px">
            <Flex vertical>
              {optimizedTitlesList?.map((item) => (
                <Accordion
                  key={item.id}
                  title={item.url}
                  description={item.content}
                  color="primary"
                  ActionButton={
                    <Button
                      size="sm"
                      variant="outlined"
                      onClick={(e) => onApprove(e, item.id, item.link_id, !item.approve)}
                      type="borderRadius"
                      color={item.approve ? 'error' : 'success'}
                      disabled={isApproveAPICallInProgress}
                      loading={editedId === item.id && isSingleApproveLoading}
                    >
                      {item.approve ? 'Reject' : 'Approve'}
                    </Button>
                  }
                />
              ))}
            </Flex>
            {isLoadMore && (
              <Button color="info" variant="text" type="borderRadius" onClick={handleLoadMore}>
                Load More
              </Button>
            )}
          </Flex>
        </Flex>
      </ShimmerPlaceholder>
    </Container>
  )
}

export default SchemaPreview
