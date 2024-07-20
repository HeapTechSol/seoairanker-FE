import TitleList from '../TitlesList/TitleList'
import ImagesList from '../ImagesList/ImagesList'
import TitlePreview from '../TitlePreview/TitlePreview'
import SocialPreview from '../SocialPreview/SocialPreview'
import ExternalTitleList from '../ExternalTitlesList/ExternalTitleList'
import DescriptionPreview from '../DescriptionPreview/DescriptionPreview'
import HeadingRecommendationsPreview from '../HeadingRecommendationsPreview/HeadingRecommendationsPreview'

import './RecommendationList.scss'

const RecommendationList = ({ selectedKey }: { selectedKey: string }) => {
  const renderList = () => {
    switch (selectedKey) {
      case 'images':
        return <ImagesList />
      case 'missing_meta_titles':
        return <TitlePreview />
      case 'anchor_titles':
        return <TitleList />
      case 'external_links':
        return <ExternalTitleList />
      case 'missing_meta_descriptions':
        return <DescriptionPreview />
      case 'og_tags':
        return <SocialPreview />
      case 'heading_suggestions':
        return <HeadingRecommendationsPreview />
      default:
        return <TitlePreview />
    }
  }

  return <>{renderList()}</>
}

export default RecommendationList
