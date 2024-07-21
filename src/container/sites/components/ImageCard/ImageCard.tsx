import React, { forwardRef } from 'react'

import Flex from '@/components/Flex'
import Button from '@/components/Button'
import TruncateText from '@/components/TruncateText'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import { EditIcon } from '@/assets/icons/svgs'

import './ImageCard.scss'

type ImageCardProps = {
  id: string
  index: number
  altText: string
  imageUrl: string
  loading: boolean
  editedId: string
  isApproved: boolean
  linkId: string
  editSuggestionHandler: (index: number, id: string) => void
  onApprove: (e: React.SyntheticEvent, type_id: string, linkId:string, status: boolean) => void
  handleBlur: (e: React.FocusEvent<HTMLElement>, type_id: string, index: number, currentText: string) => void
}

const ImageCard = forwardRef<HTMLElement, ImageCardProps>(
  ({ id, index, altText, loading, editedId, imageUrl, linkId, onApprove, handleBlur, isApproved, editSuggestionHandler }, ref) => {
    return (
      <Container borderRadius boxShadow className="image-container" padding={8}>
        <Flex vertical gap={12} align="center">
          <div className="image-wrapper">
            <img src={imageUrl} alt={altText || ''} />
          </div>
          <Flex align="center" gap={16}>
            <span className="pointer-icon-fill" onClick={() => editSuggestionHandler(index, id)}>
              {EditIcon}
            </span>
            <Typography
              color="warning"
              text={<TruncateText text={altText} width={150} line={1} key={1} />}
              contentEditable={id === editedId}
              onBlur={(e) => handleBlur(e, id, index, altText)}
              ref={ref}
            />
          </Flex>
          <Button
            size="sm"
            variant="outlined"
            onClick={(e) => onApprove(e, id, linkId, isApproved)}
            type="borderRadius"
            color={isApproved ? 'error' : 'success'}
            loading={id === editedId && loading}
          >
            {isApproved ? 'Reject' : 'Approve'}
          </Button>
        </Flex>
      </Container>
    )
  }
)

export default ImageCard
