import Flex from '@/components/Flex'
import Container from '@/components/Container/Container'

import './ImageCard.scss'
import TruncateText from '@/components/TruncateText'
import Button from '@/components/Button'

const ImageCard = ({ imageUrl, altText }: { imageUrl: string; altText: string }) => {
  return (
    <Container borderRadius boxShadow className="image-container" padding={4}>
      <Flex vertical gap={12}>
        <div className="image-wrapper">
          <img src={imageUrl} alt={altText || ''} />
        </div>
        <TruncateText text={altText} line={1} width={150}></TruncateText>
        <Button size='sm' variant='outlined' type='borderRadius'>Approve</Button>
      </Flex>
    </Container>
  )
}

export default ImageCard
