import { z } from 'zod'

import ScriptStep from './components/ScriptStep/ScriptStep'
import Typography from '@/components/Typography/Typography'
import AddSite from '@/container/sites/components/AddSite/AddSite'
import CircularProgress from '@/components/CircularProgress/CircularProgress'
// import AddKeywords from '@/container/sites/components/AddKeywords/AddKeywords'
// import KeywordsInfo from '@/container/sites/components/KeywordsInfo/KeywordsInfo'
import AddSiteDetails from '@/container/sites/components/AddSiteDetails/AddSiteDetails'
// import RecommendationInfo from '@/container/sites/components/RecommendationsInfo/RecommendationInfo'

import { CommonValidations } from '@/utils/commonValidations'

import { MdOutlineWatchLater } from 'react-icons/md'

import { Unknown } from '@/utils/commonTypes'
import { KeywordsDataTypes } from './sitesTypes'
import { ColumnType } from '@/components/Table/types'
import { APIKeysDataTypes } from '../billing/billingTypes'
// import { URL_REGEX } from '@/utils/regex'

const { requiredMessage } = CommonValidations

export const ADD_SITE_WIZARD_DEFAULT_VALUES = {
  siteUrl: '',
  pages: 10500,
  jsonSchemas: true,
  businessType: '',
  country: '',
  language: '',
  script: '',
}

export const ADD_KEYWORDS_DEFAULT_VALUES = {
  country: '',
  language: '',
  keywords: '',
  track_local: false,
  refresh_frequency: '',
  track_local_value: '',
}

export const ADD_SITE_WIZARD_VALIDATIONS = [
  z.object({
    siteUrl: z
      .string({
        invalid_type_error: requiredMessage('Site URL'),
        required_error: requiredMessage('Site URL'),
      })
      // .regex(URL_REGEX, 'Site URL is invalid')
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
    keywords: z
      .string({
        invalid_type_error: requiredMessage('Keywords'),
        required_error: requiredMessage('Keywords'),
      })
      .min(2, requiredMessage('Keywords')),
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
    refresh_frequency: z
      .string({
        invalid_type_error: requiredMessage('Schedule'),
        required_error: requiredMessage('Schedule'),
      })
      .min(2, requiredMessage('Schedule')),
    track_local: z.boolean().optional(),
    track_local_value: z.string().optional(),
  })
  .optional()

export const steps = (control: Unknown) => [
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
  // {
  //   title: 'Keywords',
  //   stepLabel: '3',
  //   component: <KeywordsInfo />,
  // },
  // {
  //   title: 'Automation',
  //   stepLabel: '4',
  //   component: <AddKeywords control={control}/>,
  // },
  // {
  //   title: 'Generating',
  //   stepLabel: '3',
  //   component: <RecommendationInfo />,
  // },
  {
    title: 'Install',
    stepLabel: '3',
    component: <ScriptStep control={control} />,
  },
]

export const KEYWORDS_COLUMN: ColumnType<KeywordsDataTypes>[] = [
  { header: 'NAME', dataKey: 'keyword' },
  { header: 'CURRENT POSITION', dataKey: 'competition_index' },
  {
    header: 'MONTHLY SEARCHES',
    dataKey: 'search_volume',
  },
  {
    header: 'COST PER CLICK',
    dataKey: 'cpc',
  },
  {
    header: 'SCORE',
    textAlign: 'center',
    render: (value: string) => (value === 'waiting' ? <MdOutlineWatchLater /> : <CircularProgress progress={value || '0'} size={30} />),
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

export const API_KEYS_COLUMN: ColumnType<APIKeysDataTypes>[] = [
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
            (e.target as HTMLParagraphElement).innerText = 'Click to Reveal'
          } else {
            (e.target as HTMLParagraphElement).innerText = text
          }
          (e.target as HTMLParagraphElement).classList.toggle('info')
        }}
      />
    ),
  },
  { header: 'LAST USED', dataKey: 'last_used' },
  {
    header: 'Action',
    render: () => <Typography color="info" text="Revoke" link />,
  },
]

export const API_KEYS_DATA = [
  { token: '9110645ab94067380b431c610ef26fbc', last_used: '3 months ago' },
  { token: '9110645ab94067380b431c610ef26fbc', last_used: '2 months ago' },
]
