import { z } from 'zod'

import Typography from '@/components/Typography/Typography'
import AddSite from '@/container/sites/components/AddSite/AddSite'
import ScriptPage from '@/container/sites/components/ScriptPage/ScriptPage'
import CircularProgress from '@/components/CircularProgress/CircularProgress'
import AddKeywords from '@/container/sites/components/AddKeywords/AddKeywords'
import KeywordsInfo from '@/container/sites/components/KeywordsInfo/KeywordsInfo'
import AddSiteDetails from '@/container/sites/components/AddSiteDetails/AddSiteDetails'
import RecommendationInfo from '@/container/sites/components/RecommendationsInfo/RecommendationInfo'

import { ColumnsTypes } from '@/components/Table/types'
import { CommonValidations } from '@/utils/commonValidations'

import { WatchIcon } from '@/assets/icons/svgs'

const { requiredMessage } = CommonValidations

export const ADD_SITE_WIZARD_DEFAULT_VALUES = {
  siteUrl: '',
  pages: 10500,
  jsonSchemas: true,
  businessType: '',
  country: '',
  language: '',
  script:'',
}

export const ADD_KEYWORDS_DEFAULT_VALUES = {
  country: '',
  language: '',
  schedule: '',
  local: false,
}

export const ADD_SITE_WIZARD_VALIDATIONS = [
  z.object({
    siteUrl: z
      .string({
        invalid_type_error: requiredMessage('Site URL'),
        required_error: requiredMessage('Site URL'),
      })
      .url({ message: 'Site URL is invalid' })
      .min(5, requiredMessage('Site URL')),
    pages: z.number().optional(),
    jsonSchemas: z.boolean().optional(),
  }),
  z
    .object({
      businessType: z
        .string({
          invalid_type_error: requiredMessage('Business type'),
          required_error: requiredMessage('Business type'),
        })
        .min(3, requiredMessage('Business type')),
      country: z
        .string({
          invalid_type_error: requiredMessage('Search Country'),
          required_error: requiredMessage('Search Country'),
        })
        .min(2, requiredMessage('Search Country')),
      language: z
        .string({
          invalid_type_error: requiredMessage('Language'),
          required_error: requiredMessage('Language'),
        })
        .min(2, requiredMessage('Language')),
    })
    .optional(),
  z.object({}).optional(),
  z.object({}).optional(),
  z.object({}).optional(),
  z.object({}).optional(),
]

export const ADD_KEYWORDS_VALIDATIONS = z
  .object({
    country: z
      .string({
        invalid_type_error: requiredMessage('Country'),
        required_error: requiredMessage('Country'),
      })
      .min(2, requiredMessage('Country')),
    language: z
      .string({
        invalid_type_error: requiredMessage('Language'),
        required_error: requiredMessage('Language'),
      })
      .min(2, requiredMessage('Language')),
    schedule: z
      .string({
        invalid_type_error: requiredMessage('Schedule'),
        required_error: requiredMessage('Schedule'),
      })
      .min(2, requiredMessage('Schedule')),
    local: z.boolean().optional(),
  })
  .optional()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const steps = (control: any) => [
  {
    title: 'Add Site',
    stepLabel: '1',
    component: <AddSite control={control} />,
  },
  {
    title: 'Details',
    stepLabel: '2',
    component: <AddSiteDetails control={control} />,
  },
  {
    title: 'Keywords',
    stepLabel: '3',
    component: <KeywordsInfo />,
  },
  {
    title: 'Automation',
    stepLabel: '4',
    component: <AddKeywords control={control}/>,
  },
  {
    title: 'Generating',
    stepLabel: '5',
    component: <RecommendationInfo />,
  },
  {
    title: 'Install',
    stepLabel: '6',
    component: <ScriptPage control={control} />,
  },
]

export const KEYWORDS_COLUMN: ColumnsTypes[] = [
  { header: 'NAME', dataKey: 'name', sortKey: 'name' },
  { header: 'CURRENT POSITION', dataKey: 'position', sortKey: 'position' },
  {
    header: 'MONTHLY SEARCHES',
    dataKey: 'monthly_searches',
    sortKey: 'monthly_searches',
  },
  {
    header: 'COST PER CLICK',
    dataKey: 'cost_per_click',
    sortKey: 'cost_per_click',
  },
  {
    header: 'SCORE',
    dataKey: 'score',
    textAlign: 'center',
    sortKey: 'score',
    render: (value: string) =>
      value === 'waiting' ? (
        <span style={{ cursor: 'auto' }} className="pointer-icon-stroke">
          {WatchIcon}
        </span>
      ) : (
        <CircularProgress progress={value} size={30} />
      ),
  },
]

export const KEYWORDS_DATA = [
  {
    name: 'portfolio websites',
    position: '79',
    monthly_searches: '30',
    cost_per_click: '$6.02',
    score: 'waiting',
  },
  {
    name: 'search optimization',
    position: 'N/A',
    monthly_searches: '1,35,000',
    cost_per_click: '$4.23',
    score: 'waiting',
  },
  {
    name: 'elit fitness',
    position: '92',
    monthly_searches: '720',
    cost_per_click: '$1.42',
    score: '70',
  },
  {
    name: 'search engine marketing',
    position: 'N/A',
    monthly_searches: '5,50,000',
    cost_per_click: '$2.39',
    score: '100',
  },
  {
    name: 'portfolio websites',
    position: '79',
    monthly_searches: '30',
    cost_per_click: '$6.02',
    score: 'waiting',
  },
  {
    name: 'search optimization',
    position: 'N/A',
    monthly_searches: '1,35,000',
    cost_per_click: '$4.23',
    score: 'waiting',
  },
  {
    name: 'elit fitness',
    position: '92',
    monthly_searches: '720',
    cost_per_click: '$1.42',
    score: '70',
  },
  {
    name: 'search engine marketing',
    position: 'N/A',
    monthly_searches: '5,50,000',
    cost_per_click: '$2.39',
    score: '100',
  },
  {
    name: 'portfolio websites',
    position: '79',
    monthly_searches: '30',
    cost_per_click: '$6.02',
    score: 'waiting',
  },
  {
    name: 'search optimization',
    position: 'N/A',
    monthly_searches: '1,35,000',
    cost_per_click: '$4.23',
    score: 'waiting',
  },
]

export const PAGES_DATA = [
  {
    path: ' /din-abc',
    depth: '0',
    lang: 'EN',
    date: '04/25/2024	',
    widget: 'waiting',
  },
  {
    path: ' /din-abcd',
    depth: '0',
    lang: 'EN',
    date: '04/25/2024	',
    widget: 'waiting',
  },
  {
    path: ' /din-bcda',
    depth: '0',
    lang: 'EN',
    date: '04/25/2024	',
    widget: 'waiting',
  },
  {
    path: ' /din-defg',
    depth: '0',
    lang: 'EN',
    date: '04/25/2024	',
    widget: 'waiting',
  },
  {
    path: ' /din-ghij',
    depth: '0',
    lang: 'EN',
    date: '04/25/2024	',
    widget: 'waiting',
  },
  {
    path: ' /din-klmn',
    depth: '0',
    lang: 'EN',
    date: '04/25/2024	',
    widget: 'waiting',
  },
  {
    path: ' /din-nmlk',
    depth: '0',
    lang: 'EN',
    date: '04/25/2024	',
    widget: 'waiting',
  },
  {
    path: ' /din-xyz',
    depth: '0',
    lang: 'EN',
    date: '04/25/2024	',
    widget: 'waiting',
  },
  {
    path: ' /din-yxz',
    depth: '0',
    lang: 'EN',
    date: '04/25/2024	',
    widget: 'waiting',
  },
  {
    path: ' /din-zxy',
    depth: '0',
    lang: 'EN',
    date: '04/25/2024	',
    widget: 'waiting',
  },
  {
    path: ' /din-klmno',
    depth: '0',
    lang: 'EN',
    date: '04/25/2024	',
    widget: 'waiting',
  },
]

export const API_KEYS_COLUMN = [
  {
    header: 'SECRET TOKEN',
    dataKey: 'token',
    render: (text: string) => (
      <Typography
        color="info"
        text="Click to Reveal"
        link
        onClick={(e) => {
          if (text === (e.target as HTMLParagraphElement).innerText) {
            ;(e.target as HTMLParagraphElement).innerText = 'Click to Reveal'
          } else {
            ;(e.target as HTMLParagraphElement).innerText = text
          }
          ;(e.target as HTMLParagraphElement).classList.toggle('info')
        }}
      />
    ),
  },
  { header: 'LAST USED', dataKey: 'last_used' },
  {
    header: 'Action',
    dataKey: '',
    render: () => <Typography color="info" text="Revoke" link />,
  },
]

export const API_KEYS_DATA = [
  { token: '9110645ab94067380b431c610ef26fbc', last_used: '3 months ago' },
  { token: '9110645ab94067380b431c610ef26fbc', last_used: '2 months ago' },
]
