import TitleList from '../TitlesList/TitleList'
import ImagesList from '../ImagesList/ImagesList'
import TitlePreview from '../TitlePreview/TitlePreview'
import SocialPreview from '../SocialPreview/SocialPreview'
import DescriptionPreview from '../DescriptionPreview/DescriptionPreview'
import HeadingRecommendationsPreview from '../HeadingRecommendationsPreview/HeadingRecommendationsPreview'

import { RecommendationsCountTypes, RecommendationsListTypes } from '@/container/sites/sitesTypes'

import './RecommendationList.scss'

const RecommendationList = ({
  recommendationData,
  selectedKey,
  recommendationCount,
}: {
  selectedKey: string
  recommendationData: RecommendationsListTypes
  recommendationCount: RecommendationsCountTypes
}) => {
  const renderList = () => {

    switch (selectedKey) {
      case '7':
        return <ImagesList images={recommendationData?.images || []} />
      case '4':
        return <TitlePreview titlesList={recommendationData?.titles || []} recommendationCount={recommendationCount} />
      case '5':
        return <TitleList titlesList={recommendationData?.links || []} recommendationCount={recommendationCount} />
      case '3':
        return <DescriptionPreview titlesList={recommendationData?.descriptions || []} recommendationCount={recommendationCount}/>
      case '2':
        return <SocialPreview titlesList={recommendationData?.og_tags || []} recommendationCount={recommendationCount}/>
      case '1':
        return <HeadingRecommendationsPreview titlesList={recommendationData?.headings_suggestions || []} recommendationCount={recommendationCount}/>
      default:
        return <TitlePreview titlesList={recommendationData?.titles || []} recommendationCount={recommendationCount} />
    }
  }

  return <>{renderList()}</>
}

export default RecommendationList
