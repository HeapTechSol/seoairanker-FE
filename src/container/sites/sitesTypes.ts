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
  total_count: string
  page?: number,
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
  snippet_installed: boolean
}

export type SitePagesSchemaTypes = {
  id: string
  link_id: string
  website_id: number
  page_id: number
  schema_type: string
  approved: boolean
  generated_schema: string
  created_at: string
  updated_at: string
  link_path: string
  url: string
}

export type SiteLinksAPIResponseTypes = {
  page: number
  per_page: number
  total_count: number
  data: SiteLinksDataTypes[]
}

export type SchemaPagesListAPIResponseTypes = {
  success: boolean
  message: string
  data: { schema_type: string; count: string; label: string }[]
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
  | 'page_schemas'
  | 'external_links'
  | 'missing_alt_images'
  | 'missing_meta_titles'
  | 'heading_suggestions'
  | 'missing_link_title_attr'
  | 'missing_meta_descriptions'
  | 'cannonical_tags'
  | 'non_indexable_pages'


export type SchemaPageTypes = string

export type CategoriesDataTypes = {
  total?: number;
  approved?: number;
  [key: string]: any;
};

export type SiteDataTypes = {
  id: number
  site_url: string
  updatedAt: string
  createdAt: string
  last_crawl: string
  next_crawl: string
  total_count: number
  favicon_url: string
  country_code: string
  language_code: string
  business_type: string
  total_approved: number
  screenshot_url: string
  schema_configured: boolean
  snippet_installed: boolean
  crawl_in_progress: boolean
  keywords_add_to_track: boolean
  recommendations_generated: boolean,
  crawl_summary: {
    crawl_status: {
      pages_in_queue: number,
      pages_crawled: number
    }
    crawl_progress: string
  }
  keywordsSummary: {
    id: number
    website_id: number
    top_10: number
    top_30: number
    top_50: number
    top_100: number
    trend_top_10: number
    trend_top_30: number
    trend_top_50: number
    trend_top_100: number
    created_at: string
    updated_at: string
  }
}

export type CrawledInfoAPIResponseTypes = {
  data: {
    categories: MaybeNull<CategoriesDataTypes>
    site_data: MaybeNull<SiteDataTypes>,
    total: { total?: number, approved: number, unapproved: number },
  }
}

export type GetRecommendationsByTypesPayloadTypes = { type: ModalTypes; per_page: number; page: number }
export type GetSchemaTypesPayloadTypes = { type: SchemaPageTypes; per_page: number; page: number }

export type SiteLinkPayloadTypes = {
  page: number
  site_id: string
  per_page: number
  schema_type?: string
}

export type SchemaPagesListPayloadTypes = {
  site_id: string
  link_id?: string
}

export type GetKeywordsPayload = {
  page: number
  site_id: string
  per_page: number
}

export type MissingTitlesDataTypes = {
  id: string
  url: string
  count: string
  label: string
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
  count: string
  label: string
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
  count: string
  label: string
  link_id: string
  link_path: string
  approved: boolean
  existing_og_tag: string
  suggested_og_tag: string
}

export type ConicalDataTypes = {
  id: string
  count: string
  label: string
  link_id: string
  link_path: string
  approved: boolean
  existing_og_tag: string
  generated_canonical: string
}

export type MetaTitleDataTypes = {
  id: string
  count: string
  label: string
  link_id: string
  link_path: string
  approved: boolean
  suggested_title: string
  existing_meta_title: string
}

export type MetaDescriptionDataTypes = {
  id: string
  count: string
  label: string
  link_id: string
  approved: boolean
  link_path: string
  suggested_description: string
  existing_meta_description: string
}

export type HeadingOptimizationDataTypes = {
  id: string
  count: string
  label: string
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
  | SitePagesSchemaTypes[]
  | ImagesAltDataTypes[]
  | MetaTitleDataTypes[]
  | MissingTitlesDataTypes[]
  | MetaDescriptionDataTypes[]
  | HeadingOptimizationDataTypes[] | ConicalDataTypes[]

export type GetRecommendationsByModelAPIResponseTypes = {
  page: number
  total_count: number
  approved_count: number
  data: AllModalDataTypes
  unapproved_count: number
  modal?: ModalTypes
  per_page?: number
}

export type GetPageSchemaByTypesAPIResponseTypes = {
  page: number
  total: number
  approved: number
  data: AllModalDataTypes
  unapproved_count: number
  modal?: ModalTypes
  per_page?: number
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
  filter_conditions: { site_id: string; id?: string; url?: string; link_id?: string }
}

export type ApproveSchemaPayloadTypes = {
  entryId: string
  schemaType: string
  website_id: string
  bulk?: boolean
  approved: boolean,
  link_id?: string
}

export type AddSitePayloadTypes = {
  pages: number
  script: string
  siteUrl: string
  country: string
  language: string
  jsonSchemas: boolean
  businessType: string
  ai_generation: boolean
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

export type SchemaTypes = {
  label: string
  count: string
  ids: string[]
  selected: boolean
}

export type SchemaResponseTypes = {
  data: { schema: SchemaTypes[]; crawl_interval: string }
}

export type NotificationAPIPayloadTypes = {
  page: number
  per_page: number
}
