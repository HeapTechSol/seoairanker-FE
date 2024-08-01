import { MaybeNull } from '@/utils/commonTypes'

export type AddSitePayload = {
  pages: number
  siteUrl: string
  country: string
  language: string
  jsonSchemas: boolean
  businessType: string
}

export type SitesAPIResponse = {
  id: number
  country: string
  user_id: number
  language: string
  site_url: string
  created_at: string
  total_count: number
  favicon_url: string
  business_type: string
  total_approved_count: number
  total_unapproved_count: number
  screenshot_url: MaybeNull<string>
}

export type SitesAPIResponseTypes = {
  data: SitesAPIResponse[]
}

export type SiteLinksDataTypes = {
  id: string
  url: string
  path: string
  site_id: string
  createdAt: string
  updatedAt: string
  last_crawled: string
  page_language: string
}

export type SiteLinksAPIResponseTypes = {
  page: number
  per_page: number
  total_count: number
  data: SiteLinksDataTypes[]
}

export type PathSearchResults = {
  id: string
  url: string
  path: string
  site_id: string
  createdAt: string
  updatedAt: string
  last_crawled: string
  page_language: string
}

export type GetSitePathSearchResultsResponseTypes = {
  data: PathSearchResults[]
}

export type ModalTypes =
  | 'og_tags'
  | 'external_links'
  | 'missing_alt_images'
  | 'missing_meta_titles'
  | 'heading_suggestions'
  | 'missing_link_title_attr'
  | 'missing_meta_descriptions'

export type ModalDataTypes = {
  total: number
  approved: number
  model: ModalTypes
}

export type SiteDataTypes = {
  id: number
  site_url: string
  updatedAt: string
  createdAt: string
  total_count: number
  favicon_url: string
  country_code: string
  language_code: string
  business_type: string
  total_approved: number
  screenshot_url: string
  schema_configured: boolean
  snippet_installed: boolean
  keywords_add_to_track: boolean
  recommendations_generated: boolean
}

export type CrawledInfoAPIResponseTypes = {
  data: {
    model_data: ModalDataTypes[]
    site_data: MaybeNull<SiteDataTypes>
  }
}

export type GetRecommendationsByTypesPayloadTypes = { type: ModalTypes; per_page: number; page: number }

export type SiteLinkPayloadTypes = {
  page: number
  site_id: string
  per_page: number
}

export type GetKeywordsPayload = {
  page: number
  site_id: string
  per_page: number
}

export type MissingTitlesDataTypes = {
  id: string
  url: string
  xpath: string
  link_id: string
  approved: boolean
  link_path: string
  css_selector: string
  existing_title: string
  suggested_title: string
}

export type ImagesAltDataTypes = {
  id: number
  url: string
  xpath: string
  page_id: string
  link_id: string
  alt_text: string
  link_path: string
  approved: boolean
  updated_at: string
  css_selector: string
}

export type OgTagsDataTypes = {
  id: string
  link_id: string
  link_path: string
  approved: boolean
  existing_og_tag: string
  suggested_og_tag: string
}

export type MetaTitleDataTypes = {
  id: string
  link_id: string
  link_path: string
  approved: boolean
  suggested_title: string
  existing_meta_title: string
}

export type MetaDescriptionDataTypes = {
  id: string
  link_id: string
  approved: boolean
  link_path: string
  suggested_description: string
  existing_meta_description: string
}

export type HeadingOptimizationDataTypes = {
  id: string
  link_id: string
  link_path: string
  approved: boolean
  suggestion: string
  css_selector: string
  current_heading: string
  heading_content: string
  suggested_heading: string
}

export type AllModalDataTypes =
  | OgTagsDataTypes[]
  | ImagesAltDataTypes[]
  | MetaTitleDataTypes[]
  | MissingTitlesDataTypes[]
  | MetaDescriptionDataTypes[]
  | HeadingOptimizationDataTypes[]

export type GetRecommendationsByModelAPIResponseTypes = {
  page: number
  total_count: number
  approved_count: number
  data: AllModalDataTypes
  unapproved_count: number
}

export type ApproveRecommendationsPayloadTypes = {
  bulk: boolean
  model?: string
  update_data: {
    approved: boolean
    alt_text?: string
    suggested_title?: string
    suggested_description?: string
    suggested_og_tag?: string
    suggested_heading?: string
  }
  filter_conditions: { site_id: string; id?: string; link_id?: string }
}

export type AddSitePayloadTypes = {
  pages: number
  script: string
  siteUrl: string
  country: string
  language: string
  jsonSchemas: boolean
  businessType: string
  keywords: MaybeNull<KeywordsDataTypes[]>
}

export type KeywordsDataTypes = {
  id: number
  cpc: number
  keyword: string
  site_id: number
  createdAt: string
  competition: string
  language_code: string
  search_volume: number
  search_partners: boolean
  competition_index: number
  snippet_installed: boolean
  low_top_of_page_bid: number
  high_top_of_page_bid: number
  location_code: MaybeNull<number>
}

export type GetKeywordsAPIResponseTypes = {
  page: number
  pages: number
  total: number
  per_page: number
  data: KeywordsDataTypes[]
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
  title: string
  read: boolean
  user_id: string
  message: string
  timestamp: string
}

export type NotificationsAPIResponseTypes = {
  page: number
  total: number
  per_page: number
  unread_count: number
  data: NotificationDataTypes[]
}

export type NotificationAPIPayloadTypes = {
  page: number
  per_page: number
}
