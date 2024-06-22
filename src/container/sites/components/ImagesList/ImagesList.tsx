import { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Flex from '@/components/Flex'
import ImageCard from '../ImageCard/ImageCard'
import Container from '@/components/Container/Container'
import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

import { RecommendationsListTypes } from '@/container/sites/sitesTypes'

const ImagesList = ({ images }: { images: RecommendationsListTypes['images'] }) => {
  const { state } = useLocation()
  const [editedId, setEditedId] = useState<string>('')
  const editableRefs = useRef<(HTMLElement | null)[]>([])

  const { approveSingleLoading, updateRecommendation, updateRecommendationsLoading, approveSingleRecommendation } = useHandleRecommendations()

  const onApprove = async (e: React.SyntheticEvent, type_id: string, status: boolean) => {
    setEditedId(type_id)
    e.stopPropagation()
    if (state?.siteId) await approveSingleRecommendation({ site_id: state?.siteId, status: status ? 'False' : 'True', type: 'images', type_id })
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

  return (
    <Container borderRadius boxShadow padding={40} width={70} className="images-listing">
      <Flex justify="center" align="center" wrap gap={8}>
        {images?.map((item, index) => (
          <ImageCard
            id={item.id}
            index={index}
            editedId={editedId}
            onApprove={onApprove}
            key={`images-${index}`}
            handleBlur={handleBlur}
            imageUrl={item.image_url}
            isApproved={item.approve}
            loading={approveSingleLoading || updateRecommendationsLoading}
            altText={item.suggested_alt_text}
            editSuggestionHandler={editSuggestionHandler}
            ref={(el) => (editableRefs.current[index] = el)}
          />
        ))}
      </Flex>
    </Container>
  )
}

export default ImagesList
