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
}

export type RecommendationsCountAPIResponseTypes = {
  results: RecommendationsCountTypes
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
  image_url:string
}

export type DescriptionRecommendations = {
  approve: boolean
  suggested_description: string
  url:string
}

export type TitlesRecommendations = {
  approve: boolean
  suggested_title: string
  url:string
}

export type RecommendationsListTypes = {
  descriptions: DescriptionRecommendations[]
  images: ImageRecommendations[]
  titles: TitlesRecommendations[]
}

export type RecommendationsAPIResponseTypes = {
  results:RecommendationsListTypes
}