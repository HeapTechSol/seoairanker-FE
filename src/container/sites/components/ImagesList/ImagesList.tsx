import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Grid from '@/components/Grid/Grid'
import ImageCard from '../ImageCard/ImageCard'
import Container from '@/components/Container/Container'
import ShimmerPlaceholder from '@/components/RadarLoader/ShimmerPlaceholder'
import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

import { ImagesAltDataTypes } from '@/container/sites/sitesTypes'

import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'

const ImagesList = ({ link_id: externalLinkId }: { link_id: string }) => {
  const { id: siteId } = useParams()
  const [editedId, setEditedId] = useState<string>('')
  const editableRefs = useRef<(HTMLElement | null)[]>([])

  const { getSiteCrawledInfoData } = useHandleSitesLogic()
  const { recommendationData, getRecommendationByType, recommendationDataLoading, handleUpdateRecommendations, approveRecommendationsLoading } =
    useHandleRecommendations()

  const onApprove = async (e: React.SyntheticEvent, type_id: string, linkId: string, status: boolean) => {
    setEditedId(type_id)
    e.stopPropagation()
    if (siteId)
      await handleUpdateRecommendations({
        model: 'missing_alt_images',
        filter_conditions: { id: type_id, link_id: linkId, site_id: siteId },
        update_data: { approved: status },
        bulk: false,
      })
    await getSiteCrawledInfoData({ site_id: siteId || '', link_id: externalLinkId })
    await getRecommendationByType({ page: 1, per_page: 20, type: 'missing_alt_images', link_id: externalLinkId })
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

  const handleBlur = async (e: React.FocusEvent<HTMLElement>, type_id: string, index: number, currentText: string, linkId: string) => {
    setEditedId(type_id)
    const text = e.target.innerText
    if (siteId && currentText != text && text) {
      await handleUpdateRecommendations({
        model: 'images',
        filter_conditions: { id: type_id, link_id: linkId, site_id: siteId },
        update_data: { approved: true, alt_text: text },
        bulk: false,
      })
      await getSiteCrawledInfoData({ site_id: siteId, link_id: externalLinkId })
      await getRecommendationByType({ page: recommendationData?.page, per_page: 20, type: 'missing_alt_images', link_id: externalLinkId })
    }
    const element = editableRefs.current[index]
    element?.setAttribute('contentEditable', 'false')
  }

  const isLoadMore = (recommendationData?.total_count || 0) > (recommendationData?.data?.length || 0)

  const handleLoadMore = () => {
    getRecommendationByType({ page: (recommendationData?.page || 0) + 1, per_page: 20, type: 'missing_alt_images', link_id: externalLinkId })
  }

  useEffect(() => {
    getRecommendationByType({ page: 1, per_page: 20, type: 'missing_alt_images', link_id: externalLinkId })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalLinkId])

  return (
    <Container borderRadius boxShadow padding={40} width={70} className="images-listing container-bg">
      <ShimmerPlaceholder loading={recommendationDataLoading} count={20} width={236} height={194} gap={8} flexDirection="row">
        <Flex vertical align="center" gap={24}>
          <Grid gap={8} minWidth={190} minMax={200}>
            {(recommendationData?.data as ImagesAltDataTypes[])?.map((item, index) => (
              <ImageCard
                id={String(item.id)}
                index={index}
                editedId={editedId}
                onApprove={onApprove}
                linkId={item.link_id}
                key={`images-${index}`}
                handleBlur={handleBlur}
                imageUrl={item.url}
                isApproved={item.approved}
                loading={approveRecommendationsLoading}
                altText={item.alt_text}
                editSuggestionHandler={editSuggestionHandler}
                ref={(el) => (editableRefs.current[index] = el)}
              />
            ))}
          </Grid>
          {isLoadMore && (
            <Button color="info" variant="text" onClick={handleLoadMore}>
              Load More
            </Button>
          )}
        </Flex>
      </ShimmerPlaceholder>
    </Container>
  )
}

export default ImagesList
