import { useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import Flex from '@/components/Flex'
import ImageCard from '../ImageCard/ImageCard'
import Container from '@/components/Container/Container'
import ShimmerPlaceholder from '@/components/RadarLoader/ShimmerPlaceholder'
import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

import { ImagesAltDataTypes } from '@/container/sites/sitesTypes'

const ImagesList = ({ link_id }: { link_id: string }) => {
  const { state } = useLocation()
  const [editedId, setEditedId] = useState<string>('')
  const editableRefs = useRef<(HTMLElement | null)[]>([])

  const {
    recommendationData,
    updateRecommendation,
    getRecommendationByType,
    recommendationDataLoading,
    updateRecommendationsLoading,
    handleUpdateRecommendations,
    approveRecommendationsLoading,
  } = useHandleRecommendations()

  const onApprove = async (e: React.SyntheticEvent, type_id: string, linkId: string, status: boolean) => {
    setEditedId(type_id)
    e.stopPropagation()
    if (state?.siteId)
      await handleUpdateRecommendations({
        model: 'images',
        filter_conditions: { id: type_id, link_id: linkId, site_id: state?.siteId },
        update_data: { approved: status },
        bulk: false,
      })
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

  const handleBlur = async (e: React.FocusEvent<HTMLElement>, type_id: string, index: number, currentText: string) => {
    setEditedId(type_id)
    const text = e.target.innerText
    if (state?.siteId && currentText != text) {
      await updateRecommendation({ site_id: state?.siteId, data: text, type: 'images', type_id })
    }
    const element = editableRefs.current[index]
    element?.setAttribute('contentEditable', 'false')
  }

  useEffect(() => {
    getRecommendationByType({ page: 1, per_page: 20, type: 'images', link_id })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link_id])

  return (
    <Container borderRadius boxShadow padding={40} width={70} className="images-listing container-bg">
      <ShimmerPlaceholder loading={recommendationDataLoading} count={20} width={236} height={194} gap={8} flexDirection="row">
        <Flex justify="center" align="center" wrap gap={8}>
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
              loading={approveRecommendationsLoading || updateRecommendationsLoading}
              altText={item.alt_text}
              editSuggestionHandler={editSuggestionHandler}
              ref={(el) => (editableRefs.current[index] = el)}
            />
          ))}
        </Flex>
      </ShimmerPlaceholder>
    </Container>
  )
}

export default ImagesList
