import Flex from '@/components/Flex'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import { SeoEllaIcon } from '@/assets/icons/svgs'

import './RecommendationsSuspense.scss'

const RecommendationSuspense = () => {
  return (
    <Container className="recommendations-suspense-loader" width={100}>
      <Flex align="center" vertical gap={64} className="suspense-loader">
        <div className="brand-icon auth-Fl" title="SEO Ella icon">
          {SeoEllaIcon}
        </div>
        <Flex vertical align="center" justify="center" gap={32}>
          <Typography text="Please Wait..." type="h3" />
          <Typography
            text="SEO Ella is generating recommendations for you, this may take few minutes. We will notify you by email once we are ready."
            textAlign="left"
          />
        </Flex>
      </Flex>
    </Container>
  )
}

export default RecommendationSuspense
