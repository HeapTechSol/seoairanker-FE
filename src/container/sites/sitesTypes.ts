export type AddSitePayload = {
  siteUrl: string;
  pages: number;
  jsonSchemas: boolean;
  businessType: string;
  country: string;
  language: string;
  userId: string;
};

export type SitesAPIResponse = {
  businessType: string;
  country: string;
  createdAt: string;
  id: number;
  language: string;
  siteUrl: string;
};

export type PaginationResponse = {
  current_page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
};

export type SiteLinksAPIResponseTypes = {
  result: SitesAPIResponse[];
  pagination: PaginationResponse;
};

export type SiteLinkPayloadTypes = {
  site_id: string;
  page: number;
  per_page: number;
  sort_by: string;
  sort_order: string;
  search: string;
};
