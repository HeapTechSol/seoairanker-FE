import { AgencyIcon, EnterpriseIcon, PersonIcon } from '@/assets/icons/svgs'

import { ColorsTypes } from '@/utils/commonTypes'

export const strongTextGenerator = (text: string) => <b>{text}</b>

const addsOnInfoGenerator = ({ extra_sites, extra_keywords, extra_pages }: addsOnKeyTypes) => {
  return [
    {
      amount: extra_sites,
      max: 100,
      step: 1,
      key: 'extra_sites',
      text: (
        <>
          Extra Sites from {strongTextGenerator(`$${extra_sites.toFixed(2)}`)} per {strongTextGenerator('1 site')}
        </>
      ),
    },
    {
      amount: extra_keywords,
      max: 10000,
      step: 100,
      key: 'extra_keywords',
      text: (
        <>
          Extra Keywords from {strongTextGenerator(`$${extra_keywords.toFixed(2)}`)} per {strongTextGenerator('100 keywords')}
        </>
      ),
    },
    {
      amount: extra_pages,
      max: 25000,
      step: 250,
      key: 'extra_pages',
      text: (
        <>
          Extra Pages from {strongTextGenerator(`$${extra_pages.toFixed(2)}`)} per {strongTextGenerator('250 pages')}
        </>
      ),
    },
  ] as addOnInfoTypes[]
}

const detailsInfoGenerator = (
  metaDescription: number,
  metaTitles: number,
  keywordRanking: number,
  pageCrawls: number,
  perSchema: number,
  perDescription: number,
  perTitle: number,
  perUpdate: number,
  perCrawl: number
) => {
  return [
    {
      amount: 0,
      text: <>AI JSON-LD Schemas for {strongTextGenerator(`$${perSchema.toFixed(2)}`)} per schema</>,
    },
    {
      amount: metaDescription,
      text: <>AI Meta Descriptions included, then {strongTextGenerator(`$${perDescription.toFixed(2)}`)} per description</>,
    },
    {
      amount: metaTitles,
      text: <>AI Meta Titles included, then {strongTextGenerator(`$${perTitle.toFixed(2)}`)} per title</>,
    },
    {
      amount: keywordRanking,
      text: <>Keyword Rankings Updates included, then {strongTextGenerator(`$${perUpdate.toFixed(2)}`)} per update</>,
    },
    {
      amount: pageCrawls,
      text: <>Page Crawls included, then {strongTextGenerator(`$${perCrawl.toFixed(2)}`)} per crawl</>,
    },
  ]
}

export const monthlyPlans: PlanTypes[] = [
  {
    planId: 1,
    amount: 299,
    Icon: PersonIcon,
    color: 'warning',
    type: 'Business',
    description: 'For consultants, startups, and small teams.',
    isAPIAccess: false,
    crawlSchedule: 'Weekly',
    buttonText: 'Request Demo',
    buttonColor: 'warning',
    planType: 'business',
    generalInfo: [
      { amount: 5, text: 'Sites' },
      { amount: 5, text: 'Team Members' },
      { amount: 500, text: 'Keywords' },
      { amount: 1250, text: 'Pages' },
    ],
    detailsInfo: detailsInfoGenerator(500, 500, 2500, 7500, 0.02, 0.01, 0.01, 0.01, 0.01),
    addOnInfo: addsOnInfoGenerator({
      extra_sites: 39.0,
      extra_keywords: 24.99,
      extra_pages: 14.99,
    }),
  },
  {
    planId: 2,
    amount: 599,
    Icon: AgencyIcon,
    color: 'primary',
    type: 'Agency',
    description: 'For agencies, e-comm stores, and other businesses.',
    isAPIAccess: true,
    crawlSchedule: 'Daily',
    buttonText: 'Get Started',
    buttonColor: 'primary',
    planType: 'agency',
    generalInfo: [
      { amount: 15, text: 'Sites' },
      { amount: 15, text: 'Team Members' },
      { amount: 2000, text: 'Keywords' },
      { amount: 5000, text: 'Pages' },
    ],
    detailsInfo: detailsInfoGenerator(1500, 1500, 8000, 30000, 0.02, 0.01, 0.01, 0.01, 0.01),
    addOnInfo: addsOnInfoGenerator({
      extra_sites: 29.0,
      extra_keywords: 14.99,
      extra_pages: 9.99,
    }),
  },
  {
    planId: 3,
    amount: 1199,
    Icon: EnterpriseIcon,
    color: 'info',
    type: 'Enterprise',
    description: 'For corporations, agencies, online retailers, tech hubs, etc.',
    isAPIAccess: true,
    crawlSchedule: 'Daily',
    buttonText: 'Get Started',
    buttonColor: 'info',
    planType: 'enterprise',
    generalInfo: [
      { amount: 50, text: 'Sites' },
      { amount: 50, text: 'Team Members' },
      { amount: 5000, text: 'Keywords' },
      { amount: 20000, text: 'Pages' },
    ],
    detailsInfo: detailsInfoGenerator(5000, 5000, 20000, 120000, 0.01, 0.01, 0.01, 0.01, 0.01),
    addOnInfo: addsOnInfoGenerator({
      extra_sites: 19.0,
      extra_keywords: 9.99,
      extra_pages: 4.99,
    }),
  },
]

export const yearlyPlans: PlanTypes[] = [
  {
    planId: 4,
    amount: 2990,
    Icon: PersonIcon,
    color: 'warning',
    type: 'Business',
    description: 'For consultants, startups, and small teams.',
    isAPIAccess: false,
    crawlSchedule: 'Weekly',
    buttonText: 'Request Demo',
    buttonColor: 'warning',
    planType: 'business',
    generalInfo: [
      { amount: 5, text: 'Sites' },
      { amount: 5, text: 'Team Members' },
      { amount: 500, text: 'Keywords' },
      { amount: 1250, text: 'Pages' },
    ],
    detailsInfo: detailsInfoGenerator(500, 500, 2500, 7500, 0.2, 0.1, 0.1, 0.01, 0.01),
    addOnInfo: addsOnInfoGenerator({
      extra_sites: 390.0,
      extra_keywords: 249.99,
      extra_pages: 149.99,
    }),
  },
  {
    planId: 5,
    amount: 5990,
    Icon: AgencyIcon,
    color: 'primary',
    type: 'Agency',
    description: 'For agencies, e-comm stores, and other businesses.',
    isAPIAccess: true,
    crawlSchedule: 'Daily',
    buttonText: 'Get Started',
    buttonColor: 'primary',
    planType: 'agency',
    generalInfo: [
      { amount: 15, text: 'Sites' },
      { amount: 15, text: 'Team Members' },
      { amount: 2000, text: 'Keywords' },
      { amount: 5000, text: 'Pages' },
    ],
    detailsInfo: detailsInfoGenerator(1500, 1500, 8000, 30000, 0.15, 0.09, 0.09, 0.01, 0.01),
    addOnInfo: addsOnInfoGenerator({
      extra_sites: 290.0,
      extra_keywords: 149.9,
      extra_pages: 99.9,
    }),
  },
  {
    planId: 6,
    amount: 11990,
    Icon: EnterpriseIcon,
    color: 'info',
    type: 'Enterprise',
    description: 'For corporations, agencies, online retailers, tech hubs, etc.',
    isAPIAccess: true,
    crawlSchedule: 'Daily',
    buttonText: 'Get Started',
    buttonColor: 'info',
    planType: 'enterprise',
    generalInfo: [
      { amount: 50, text: 'Sites' },
      { amount: 50, text: 'Team Members' },
      { amount: 5000, text: 'Keywords' },
      { amount: 20000, text: 'Pages' },
    ],
    detailsInfo: detailsInfoGenerator(5000, 5000, 20000, 120000, 0.1, 0.08, 0.08, 0.01, 0.01),
    addOnInfo: addsOnInfoGenerator({
      extra_sites: 190.0,
      extra_keywords: 99.9,
      extra_pages: 49.9,
    }),
  },
]

export type infoTypes = {
  amount: number
  text: string | JSX.Element
}

export type addOnInfoTypes = infoTypes & {
  key: 'extra_sites' | 'extra_keywords' | 'extra_pages'
  max: number
  step: number
}

export type PlanTypes = {
  amount: number
  Icon: JSX.Element
  color: ColorsTypes
  type: string
  description: string
  generalInfo: infoTypes[]
  detailsInfo: infoTypes[]
  isAPIAccess: boolean
  crawlSchedule: string
  planId: number
  addOnInfo: addOnInfoTypes[]
  buttonText: string
  buttonColor: ColorsTypes
  planType: PlansTitles
}

export type PlansTitles = 'business' | 'agency' | 'enterprise'

type addsOnKeyTypes = {
  extra_sites: number
  extra_keywords: number
  extra_pages: number
}

export type addOnsData = { key: string; amount: number; step: number; quantity: number; plan_id: string }

export type PlanDefaultValuesTypes = {
  business: addsOnKeyTypes
  agency: addsOnKeyTypes
  enterprise: addsOnKeyTypes
  selectedPlan: PlansTitles
  pricing_id: string
  planId: number
  totalAmount: number
  selectedPlanData: {
    planAmount: number
    planType: string
    addOnsData: { key: string; amount: number; step: number }[]
  }
}

const addOnDefaultKeysAndValues = {
  extra_sites: 0,
  extra_keywords: 0,
  extra_pages: 0,
}

export const planDefaultValues = {
  business: addOnDefaultKeysAndValues,
  agency: addOnDefaultKeysAndValues,
  enterprise: addOnDefaultKeysAndValues,
  selectedPlan: 'basic',
  totalAmount: 0,
  selectedPlanData: {},
}
