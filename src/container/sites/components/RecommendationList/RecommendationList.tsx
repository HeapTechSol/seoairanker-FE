import TitleList from '../TitlesList/TitleList'
import ImagesList from '../ImagesList/ImagesList'
import TitlePreview from '../TitlePreview/TitlePreview'
import SocialPreview from '../SocialPreview/SocialPreview'
import ConicalTagPreview from '../ConicalTagsPreview/ConicalTagPreview'
import NonIndexablePages from '../NonIndexablePages/NonIndexablePages'
import ExternalTitleList from '../ExternalTitlesList/ExternalTitleList'
import DescriptionPreview from '../DescriptionPreview/DescriptionPreview'

import HeadingRecommendationsPreview from '../HeadingRecommendationsPreview/HeadingRecommendationsPreview'

import { ModalTypes } from '@/container/sites/sitesTypes'

import './RecommendationList.scss'

const RecommendationList = ({ selectedKey, link_id, defaultKey }: { selectedKey: string; link_id: string, defaultKey: ModalTypes }) => {
  const renderList = () => {
    switch (selectedKey || defaultKey) {
      case 'missing_alt_images':
        return <ImagesList link_id={link_id} />
      case 'missing_meta_titles':
        return <TitlePreview link_id={link_id} />
      case 'missing_link_title_attr':
        return <TitleList link_id={link_id} />
      case 'external_links':
        return <ExternalTitleList link_id={link_id} />
      case 'missing_meta_descriptions':
        return <DescriptionPreview link_id={link_id} />
      case 'og_tags':
        return <SocialPreview link_id={link_id} />
      case 'heading_suggestions':
        return <HeadingRecommendationsPreview link_id={link_id} />
      case 'cannonical_tags':
        return <ConicalTagPreview link_id={link_id} />
      case 'non_indexable_pages':
        return <NonIndexablePages link_id={link_id} />
    }
  }

  return <>{renderList()}</>
}

export default RecommendationList
