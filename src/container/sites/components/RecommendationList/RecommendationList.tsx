import TitleList from '../TitlesList/TitleList'
import ImagesList from '../ImagesList/ImagesList'

import { RecommendationsListTypes } from '@/container/sites/sitesTypes'

import './RecommendationList.scss'

const RecommendationList = ({ recommendationData, selectedKey }: { selectedKey: string; recommendationData: RecommendationsListTypes }) => {
  console.log("e", selectedKey)
  const renderList = () => {
    switch (selectedKey) {
      case '7':
        return <ImagesList images={recommendationData.images || []} />
      case '4':
        return <TitleList titlesList={recommendationData.titles || []} uniqueIdentifier="suggested_title"/>
      case '3':
        return <TitleList titlesList={recommendationData.descriptions || []} uniqueIdentifier="suggested_description"/>
      default:
        break
    }
  }

  return <>{renderList()}</>
}

export default RecommendationList
