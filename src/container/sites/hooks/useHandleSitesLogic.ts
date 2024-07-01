import { useState } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { steps, ADD_SITE_WIZARD_DEFAULT_VALUES, ADD_SITE_WIZARD_VALIDATIONS } from '../utils'

import {
  useAddSiteMutation,
  useDeleteSiteMutation,
  useLazyGetSightInsightsQuery,
  useLazyGetSiteCrawledInfoQuery,
  useLazyGetSiteLinksAndContentQuery,
  useLazyGetSitesQuery,
} from '../api/sitesAPI'

import { ErrorTypes } from '@/utils/commonTypes'
import { EXACT_ROUTES } from '@/constant/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppSelector } from '@/api/store'
import { SiteLinkPayloadTypes } from '../sitesTypes'

const { SITES_DASHBOARD } = EXACT_ROUTES

const useHandleSitesLogic = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)

  const { control, getValues, handleSubmit } = useForm({
    defaultValues: ADD_SITE_WIZARD_DEFAULT_VALUES,
    resolver: zodResolver(ADD_SITE_WIZARD_VALIDATIONS[currentStep]),
  })

  const userQuota = useAppSelector((state) => state.billing.userQuota)

  const isSiteQuotaExceeded = (userQuota?.used_sites_quota as number) >= (userQuota?.total_sites_quota as number)

  const [addSite, { isLoading }] = useAddSiteMutation()
  const [deleteSite, { isLoading: deleteSideLoading }] = useDeleteSiteMutation()
  const [getSites, { isFetching: sitesListLoading, data: sitesList }] = useLazyGetSitesQuery()
  const [getSiteCrawledInfo, { data: crawledInfo }] = useLazyGetSiteCrawledInfoQuery()
  const [getSightInsights, { isFetching: insightsLoading, data: insightsData }] = useLazyGetSightInsightsQuery()
  const [getSiteLinksAndContent, { isFetching: siteLinksLoading, data: siteLinkAndContent }] = useLazyGetSiteLinksAndContentQuery()

  const stepsCount = steps(control)?.length

  const handleNext = async () => {
    if (currentStep >= stepsCount) return
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
      const values = getValues()
      const response = await addSite({
        ...values,
      }).unwrap()
      toast.success(response?.message)
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

  const getSiteLinks = async (payload: SiteLinkPayloadTypes) => {
    try {
      await getSiteLinksAndContent(payload).unwrap()
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

  const getSiteCrawledInfoData = async (payload: { site_id: string }) => {
    try {
      await getSiteCrawledInfo(payload).unwrap()
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
    getInsights,
    currentStep,
    getSitesList,
    getSiteLinks,
    submitHandler,
    insightsLoading,
    handleDeleteSite,
    sitesListLoading,
    siteLinksLoading,
    deleteSideLoading,
    getSiteCrawledInfoData,
    handleForwardButtonPress,
    handlePreviousButtonPress,
    insightsData: insightsData?.result,
    sitesList: sitesList?.result || [],
    crawledInfo: crawledInfo?.result,
    siteLinkAndContent: siteLinkAndContent,
  }
}

export default useHandleSitesLogic
