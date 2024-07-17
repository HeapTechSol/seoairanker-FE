import { useState } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

import { steps, ADD_SITE_WIZARD_DEFAULT_VALUES, ADD_SITE_WIZARD_VALIDATIONS } from '../utils'

import {
  useAddSiteMutation,
  useDeleteSiteMutation,
  useLazyGetSiteLinksQuery,
  useLazyGetSiteKeywordsQuery,
  useLazyGetSightInsightsQuery,
  useLazyGetSiteCrawledInfoQuery,
  useLazyGetSitesQuery,
} from '../api/sitesAPI'

import { useAppSelector } from '@/api/store'
import { EXACT_ROUTES } from '@/constant/routes'
import { ErrorTypes } from '@/utils/commonTypes'
import { AddSitePayloadTypes, GetKeywordsPayload, SiteLinkPayloadTypes } from '../sitesTypes'

const { SITES_DASHBOARD } = EXACT_ROUTES

const useHandleSitesLogic = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)

  const { control, getValues, setValue, handleSubmit } = useForm<AddSitePayloadTypes>({
    defaultValues: ADD_SITE_WIZARD_DEFAULT_VALUES,
    resolver: zodResolver(ADD_SITE_WIZARD_VALIDATIONS[currentStep]),
  })

  const userQuota = useAppSelector((state) => state.billing.userQuota)

  const isSiteQuotaExceeded = (userQuota?.sites_quota_left as number) >= (userQuota?.sites_quota as number)

  const [addSite, { isLoading }] = useAddSiteMutation()
  const [deleteSite, { isLoading: deleteSideLoading }] = useDeleteSiteMutation()
  const [getSites, { isFetching: sitesListLoading, data: sitesList }] = useLazyGetSitesQuery()
  const [getSiteKeywords, { data: keywordsData, isFetching: keywordsLoading }] = useLazyGetSiteKeywordsQuery()
  const [getSightInsights, { isFetching: insightsLoading, data: insightsData }] = useLazyGetSightInsightsQuery()
  const [getSiteCrawledInfo, { data: crawledInfo, isFetching:crawlInfoLoading }] = useLazyGetSiteCrawledInfoQuery()
  const [getSiteLinks, { isFetching: siteLinksLoading, data: siteLinks }] = useLazyGetSiteLinksQuery()

  const stepsCount = steps(control)?.length

  const handleNext = async () => {
    if (currentStep >= stepsCount) return
    if (currentStep === 2) {
      const values = getValues()
      const response = await addSite({
        ...values,
      }).unwrap()
      toast.success(response?.message)
      setValue('script', response.data || '')
      setCurrentStep((prev) => prev + 1)
      return
    }
    setCurrentStep((prev) => prev + 1)
  }

  const handleForwardButtonPress = () => {
    if (isSiteQuotaExceeded) {
      toast.error('You cannot add a new site, your quota to add site is exceeded')
      return
    }
    handleSubmit(handleNext)()
  }

  const submitHandler = async () => {
    try {
      navigate(SITES_DASHBOARD)
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const getSitesList = async () => {
    try {
      await getSites().unwrap()
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const handleGetSiteLinks = async (payload: SiteLinkPayloadTypes) => {
    try {
      await getSiteLinks(payload).unwrap()
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const getInsights = async (payload: { url: string }) => {
    try {
      await getSightInsights(payload).unwrap()
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const getKeywords = async (payload: GetKeywordsPayload) => {
    try {
      const data = await getSiteKeywords(payload).unwrap()
      setValue('keywords', data.data)
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const getSiteCrawledInfoData = async (site_id: string) => {
    try {
      await getSiteCrawledInfo(site_id).unwrap()
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const handleDeleteSite = async (id: number, setShowModel: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      const response = await deleteSite(id).unwrap()
      toast.success(response?.message, { autoClose: 1000 })
      setShowModel(false)
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const handlePreviousButtonPress = () => {
    if (currentStep === stepsCount) return
    setCurrentStep((prev) => prev - 1)
  }

  return {
    control,
    isLoading,
    getKeywords,
    keywordsData,
    keywordsLoading,
    getInsights,
    currentStep,
    getSitesList,
    submitHandler,
    insightsLoading,
    crawlInfoLoading,
    handleDeleteSite,
    sitesListLoading,
    siteLinksLoading,
    deleteSideLoading,
    handleGetSiteLinks,
    getSiteCrawledInfoData,
    handleForwardButtonPress,
    handlePreviousButtonPress,
    insightsData: insightsData?.result,
    sitesList: sitesList?.data || [],
    crawledInfo: crawledInfo?.data,
    siteLinks: siteLinks,
  }
}

export default useHandleSitesLogic
