import Flex from '@/components/Flex'
import ImageCard from '../ImageCard/ImageCard'
import Container from '@/components/Container/Container'

import { RecommendationsListTypes } from '@/container/sites/sitesTypes'

const ImagesList = ({ images }: { images: RecommendationsListTypes['images'] }) => {
  return (
    <Container borderRadius boxShadow padding={40} width={70} className='images-listing'>
      <Flex justify="center" align="center" wrap gap={8}>
        {images?.map((item, index) => <ImageCard imageUrl={item.image_url} altText={item.suggested_alt_text} key={`images-${index}`} />)}
      </Flex>
    </Container>
  )
}

export default ImagesList
