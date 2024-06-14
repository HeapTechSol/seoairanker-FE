export type AddSitePayload = {
  siteUrl: string
  pages: number
  jsonSchemas: boolean
  businessType: string
  country: string
  language: string
  userId: string
}

export type SitesAPIResponse = {
  businessType: string
  country: string
  createdAt: string
  id: number
  language: string
  siteUrl: string
  recommendations: {
    approved: number
    unapproved: number
  }
}

export type SitesAPIResponseTypes = {
  result: SitesAPIResponse[]
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

export type RecommendationsCountTypes = {
  approved_title_count: number
  un_approved_title_count: number
  approved_description_count: number
  un_approved_description_count: number
  approved_image_count: number
  un_approved_image_count: number
  approved_missing_title_count: number
  un_approved_missing_title_count: number
  approved_og_tags_count: number
  un_approved_og_tags_count: number
  approved_heading_count: number
  un_approved_heading_count: number
}

export type RecommendationsCountAPIResponseTypes = {
  results: RecommendationsCountTypes
}

export type CrawledInfoAPIResponseTypes = {
  result: {
    lastUpdatedAt: string
    recommendations: {
      approved: number
      unapproved: number
    }
  }
}

export type SiteLinkPayloadTypes = {
  site_id: string
  page: number
  per_page: number
  sort_by: string
  sort_order: string
  search: string
}

export type ImageRecommendations = {
  approve: boolean
  suggested_alt_text: string
  url: string
  xpath: string
  image_url: string
}

export type DescriptionRecommendations = {
  approve: boolean
  suggested_description: string
  existing_description: string
  url: string
}

export type TitlesRecommendations = {
  approve: boolean
  suggested_title: string
  existing_title: string
  url: string
}

export type AnchorTitlesRecommendations = {
  approve: boolean
  xpath: string
  suggested_link_title: string
  url: string
}

export type OG_TagsRecommendations = {
  approve: boolean
  xpath: string
  suggested_og_tag: string
  existing_og_tag: string
  url: string
}

export type HeadingRecommendations = {
  url: string
  approve: boolean
  suggested_heading: string
  current_heading: string
  xpath: string
  heading_content: string
}

export type RecommendationsListTypes = {
  descriptions: DescriptionRecommendations[]
  images: ImageRecommendations[]
  titles: TitlesRecommendations[]
  links: AnchorTitlesRecommendations[]
  og_tags: OG_TagsRecommendations[]
  headings_suggestions: HeadingRecommendations[]
}

export type RecommendationsAPIResponseTypes = {
  results: RecommendationsListTypes
}
