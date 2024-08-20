import { PlanDataType } from '@/container/billing/billingTypes'

import { ColorsTypes } from '@/utils/commonTypes'

export const strongTextGenerator = (text: string) => <b>{text}</b>

export const addsOnInfoGenerator = (plan: PlanDataType) => {
  const extraSite = plan?.extra_addons?.find((item) => item?.key === 'price_extra_sites')
  const extraPages = plan?.extra_addons?.find((item) => item?.key === 'price_extra_pages')
  const extraKeyword = plan?.extra_addons?.find((item) => item?.key === 'price_extra_keywords')
  return [
    {
      amount: extraSite?.value,
      max: 100,
      step: extraSite?.step,
      stripe_price_id:extraSite?.stripe_price_id,
      key: 'price_extra_sites',
      text: (
        <>
          Extra Sites from {strongTextGenerator(`$${extraSite?.value?.toFixed(2)}`)} per {strongTextGenerator(`${extraSite?.per_set} site`)}
        </>
      ),
    },
    {
      amount: extraKeyword?.value,
      max: 10000,
      step: extraKeyword?.step,
      stripe_price_id:extraKeyword?.stripe_price_id,
      key: 'price_extra_keywords',
      text: (
        <>
          Extra Keywords from {strongTextGenerator(`$${extraKeyword?.value?.toFixed(2)}`)} per{' '}
          {strongTextGenerator(`${extraKeyword?.per_set} keywords`)}
        </>
      ),
    },
    {
      amount: extraPages?.value,
      max: 25000,
      step: extraPages?.step,
      stripe_price_id:extraPages?.stripe_price_id,
      key: 'price_extra_pages',
      text: (
        <>
          Extra Pages from {strongTextGenerator(`$${extraPages?.value?.toFixed(2)}`)} per {strongTextGenerator(`${extraPages?.per_set} pages`)}
        </>
      ),
    },
  ] as addOnInfoTypes[]
}

export const displaySiteQuotaDetails = (plan: PlanDataType) => {
  const title = plan?.quota_details?.find((item) => item?.key?.toLowerCase().includes('title'))
  const schema = plan?.quota_details?.find((item) => item?.key?.toLowerCase().includes('schema'))
  const keyword = plan?.quota_details?.find((item) => item?.key?.toLowerCase().includes('keyword'))
  const description = plan?.quota_details?.find((item) => item?.key?.toLowerCase().includes('description'))
  const pageCrawl = plan?.quota_details?.find((item) => item?.key?.toLowerCase().includes('crawl'))
  return [
    {
      amount: schema?.value || 0,
      text: <>AI JSON-LD Schemas for {strongTextGenerator(`$${schema?.per_price?.toFixed(2)}`)} per schema</>,
    },
    {
      amount: description?.value || 0,
      text: <>AI Meta Descriptions included, then {strongTextGenerator(`$${description?.per_price?.toFixed(2)}`)} per description</>,
    },
    {
      amount: title?.value || 0,
      text: <>AI Meta Titles included, then {strongTextGenerator(`$${title?.per_price?.toFixed(2)}`)} per title</>,
    },
    {
      amount: keyword?.value || 0,
      text: <>Keyword Rankings Updates included, then {strongTextGenerator(`$${keyword?.per_price?.toFixed(2)}`)} per update</>,
    },
    {
      amount: pageCrawl?.value || 0,
      text: <>Page Crawls included, then {strongTextGenerator(`$${pageCrawl?.per_price?.toFixed(2)}`)} per crawl</>,
    },
  ]
}

export type infoTypes = {
  amount: number
  text: string | JSX.Element
}

export type addOnInfoTypes = infoTypes & {
  key: 'price_extra_sites' | 'price_extra_pages' | 'price_extra_keywords'
  max: number
  step: number
  stripe_price_id:string,
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
  planId: string
  addOnInfo: addOnInfoTypes[]
  buttonText: string
  buttonColor: ColorsTypes
  planType: PlansTitles
  stripe_price_id:string
}

export type PlansTitles = 'Basic' | 'Pro' | 'Enterprise' | 'Basic Annual' | 'Pro Annual' | 'Enterprise Annual'

export type addsOnKeyTypes = {
  price_extra_sites: number
  price_extra_keywords: number
  price_extra_pages: number
  stripe_price_id:string
}

export type addOnsData = { key: string; amount: number; step: number; quantity: number; plan_id: string }

export type PlanDefaultValuesTypes = {
  Basic: addsOnKeyTypes
  Pro: addsOnKeyTypes
  Enterprise: addsOnKeyTypes
  'Basic Annual': addsOnKeyTypes
  'Pro Annual': addsOnKeyTypes
  'Enterprise Annual': addsOnKeyTypes
  selectedPlan: PlansTitles
  pricing_id: string
  planId: string
  totalAmount: number
  selectedPlanData: {
    planAmount: number
    planType: string
    stripe_price_id:string
    addOnsData: { key: string; amount: number; step: number, stripe_price_id:string }[]
  }
}

const addOnDefaultKeysAndValues = {
  price_extra_sites: 0,
  price_extra_keywords: 0,
  price_extra_pages: 0,
}

export const planDefaultValues = {
  Basic: addOnDefaultKeysAndValues,
  Pro: addOnDefaultKeysAndValues,
  Enterprise: addOnDefaultKeysAndValues,
  'Basic Annual': addOnDefaultKeysAndValues,
  'Pro Annual': addOnDefaultKeysAndValues,
  'Enterprise Annual': addOnDefaultKeysAndValues,
  selectedPlan: 'Basic',
  totalAmount: 0,
  selectedPlanData: {},
}
