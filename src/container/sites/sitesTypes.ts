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

export type PaginationResponse = {
  current_page: number
  per_page: number
  total_items: number
  total_pages: number
}

export type SiteLinksAPIResponseTypes = {
  result: SitesAPIResponse[]
  pagination: PaginationResponse
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
    }
  }
}

export type GetRecommendationsByTypesPayloadTypes = { type: ModalTypes; per_page: number; page: number }

export type SiteLinkPayloadTypes = {
  site_id: string
  page: number
  per_page: number
  sort_by: string
  sort_order: string
  search: string
}

export type MissingTitlesDataTypes = {
  id: string
  link_id: string
  suggested_title: string
  approved: boolean
  existing_title: string
  xpath: string
  css_selector: string
}

export type ImagesAltDataTypes = {
  alt_text: string
  approved: boolean
  id: number
  link_id: string
  url: string
}

export type OgTagsDataTypes = {
  approved: boolean
  existing_og_tag: string
  id: string
  link_id: string
  suggested_og_tag: string
}

export type MetaTitleDataTypes = {
  approved: boolean
  suggested_title: string
  id: string
  link_id: string
  existing_meta_title: string
}

export type MetaDescriptionDataTypes = {
  approved: boolean
  suggested_description: string
  id: string
  link_id: string
  existing_meta_description: string
}

export type HeadingOptimizationDataTypes = {
  approved: boolean
  css_selector: string
  current_heading: string
  heading_content: string
  id: string
  link_id: string
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
  high_top_of_page_bid: number
  keyword: string
  keyword_annotations: {
    concepts: [
      {
        concept_group: {
          name: string
          type: string
        }
        name: string
      },
    ]
  }
  language_code: string
  location_code: MaybeNull<string>
  low_top_of_page_bid: number
  monthly_searches: {
    month: number
    search_volume: number
    year: number
  }[]

  search_partners: boolean
  search_volume: number
}

export type GetKeywordsAPIResponseTypes = {
  data: KeywordsDataTypes[]
}
