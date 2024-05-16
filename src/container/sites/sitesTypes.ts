export type AddSitePayload = {
  siteUrl: string;
  pages: number;
  jsonSchemas: boolean;
  businessType: string;
  country: string;
  language: string;
};

export type SitesAPIResponse = {
  businessType: string;
  country: string;
  createdat: string;
  id: number;
  language: string;
  siteUrl: string;
};
