import { MaybeNull } from '@/utils/commonTypes'

export type AddSitePayload = {
  siteUrl: string
  pages: number
  jsonSchemas: boolean
  businessType: string
  country: string
  language: string
}

export type SitesAPIResponse = {
  business_type: string
  country: string
  created_at: string
  favicon_url: string
  id: number
  language: string
  screenshot_url: MaybeNull<string>
  site_url: string
  total_approved_count: number
  total_count: number
  total_unapproved_count: number
  user_id: number
}

export type SitesAPIResponseTypes = {
  data: SitesAPIResponse[]
}

export type SiteLinksDataTypes = {
  id: string
  site_id: string
  url: string
  path: string
  last_crawled: string
  page_language: string
  createdAt: string
  updatedAt: string
}

export type SiteLinksAPIResponseTypes = {
  data: SiteLinksDataTypes[]
  page: number
  per_page: number
  total_count: number
}

export type ModalTypes = 'anchor_titles' | 'images' | 'og_tags' | 'heading_suggestions' | 'missing_meta_titles' | 'missing_meta_descriptions'

export type CrawledInfoAPIResponseTypes = {
  data: {
    model_data: {
      approved: number
      model: ModalTypes
      total: number
    }[]
    site_data: {
      business_type: string
      country_code: string
      createdAt: string
      id: number
      language_code: string
      site_url: string
      total_approved: number
      total_count: number
      updatedAt: string
      screenshot_url: string
    }
  }
}

export type GetRecommendationsByTypesPayloadTypes = { type: ModalTypes; per_page: number; page: number }

export type SiteLinkPayloadTypes = {
  site_id: string
  page: number
  per_page: number
}

export type GetKeywordsPayload = {
  site_id: string
  page: number
  per_page: number
}

export type MissingTitlesDataTypes = {
  id: string
  link_id: string
  suggested_title: string
  approved: boolean
  existing_title: string
  xpath: string
  link_path: string
  css_selector: string
}

export type ImagesAltDataTypes = {
  alt_text: string
  approved: boolean
  id: number
  link_id: string
  link_path: string
  url: string
}

export type OgTagsDataTypes = {
  approved: boolean
  existing_og_tag: string
  id: string
  link_id: string
  link_path: string
  suggested_og_tag: string
}

export type MetaTitleDataTypes = {
  approved: boolean
  suggested_title: string
  id: string
  link_id: string
  link_path: string
  existing_meta_title: string
}

export type MetaDescriptionDataTypes = {
  approved: boolean
  suggested_description: string
  id: string
  link_id: string
  link_path: string
  existing_meta_description: string
}

export type HeadingOptimizationDataTypes = {
  approved: boolean
  css_selector: string
  current_heading: string
  heading_content: string
  id: string
  link_id: string
  link_path: string
  suggested_heading: string
  suggestion: string
}

export type GetRecommendationsByModelAPIResponseTypes = {
  approved_count: number
  data:
    | ImagesAltDataTypes[]
    | OgTagsDataTypes[]
    | HeadingOptimizationDataTypes[]
    | MetaTitleDataTypes[]
    | MissingTitlesDataTypes[]
    | MetaDescriptionDataTypes[]
  total_count: number
  unapproved_count: number
}

export type ApproveRecommendationsPayloadTypes = {
  filter_conditions: { site_id: string; id?: string; link_id?: string }
  update_data: { approved: boolean }
  bulk: boolean
  model?: string
}

export type AddSitePayloadTypes = {
  siteUrl: string
  pages: number
  jsonSchemas: boolean
  businessType: string
  country: string
  language: string
  script: string
  keywords: MaybeNull<KeywordsDataTypes[]>
}

export type KeywordsDataTypes = {
  competition: string
  competition_index: number
  cpc: number
  createdAt: string
  high_top_of_page_bid: number
  id: number
  keyword: string
  language_code: string
  location_code: MaybeNull<number>
  low_top_of_page_bid: number
  search_partners: boolean
  search_volume: number
  site_id: number
}

export type GetKeywordsAPIResponseTypes = {
  data: KeywordsDataTypes[]
  page: number
  pages: number
  per_page: number
  total: number
}

export type AddKeywordsDefaultValues = {
  country: string
  language: string
  keywords: string
  track_local: boolean
  refresh_frequency: string
  track_local_value: string
}

export type AddKeyWordsPayloadTypes = {
  site_id: string
  country: string
  language: string
  keywords: string[]
  track_local: boolean
  refresh_frequency: string
  track_local_value: string
}

export type NotificationDataTypes = {
  id: string
  title:string
  user_id: string
  message: string
  timestamp: string
  read: boolean
}

export type NotificationsAPIResponseTypes = {
  data: NotificationDataTypes[]
  page: number
  unread_count: number
  total: number
  per_page: number
}

export type NotificationAPIPayloadTypes = {
  page: number, per_page: number
}