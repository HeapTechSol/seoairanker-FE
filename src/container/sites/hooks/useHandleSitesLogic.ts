import { useState } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

import { steps, ADD_SITE_WIZARD_DEFAULT_VALUES, ADD_SITE_WIZARD_VALIDATIONS } from '../utils'

import {
  useAddSiteMutation,
  useLazyGetSitesQuery,
  useDeleteSiteMutation,
  useLazyGetSiteLinksQuery,
  useLazyGetSiteKeywordsQuery,
  useLazyGetSightInsightsQuery,
  useLazyReadNotificationQuery,
  useLazyGetNotificationsQuery,
  useLazyGetSiteCrawledInfoQuery,
  useLazyGetSitePathSearchResultsQuery,
  useLazyExportToCSVQuery,
} from '../api/sitesAPI'

import { uniqBy } from '@/utils/helper'
import { EXACT_ROUTES } from '@/constant/routes'
import { ErrorTypes } from '@/utils/commonTypes'
import { createSingleExcelFile } from '@/utils/handleCSV'
import { useAppDispatch, useAppSelector } from '@/api/store'
import { AddSitePayloadTypes, GetKeywordsPayload, NotificationAPIPayloadTypes, SiteLinkPayloadTypes } from '../sitesTypes'
import { setCrawledInfo, setNotificationsData } from '../sitesSlice'

const { SITES_DASHBOARD } = EXACT_ROUTES

const useHandleSitesLogic = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [currentStep, setCurrentStep] = useState(0)

  const { control, getValues, setValue, handleSubmit } = useForm<AddSitePayloadTypes>({
    defaultValues: ADD_SITE_WIZARD_DEFAULT_VALUES,
    resolver: zodResolver(ADD_SITE_WIZARD_VALIDATIONS[currentStep]),
  })

  const userQuota = useAppSelector((state) => state.billing.userQuota)
  const crawledInfo = useAppSelector((state) => state.sites.crawledInfo)
  const notificationsData = useAppSelector((state) => state.sites.notificationsData)

  const isSiteQuotaExceeded = (userQuota?.sites_quota_left as number) >= (userQuota?.sites_quota as number)

  const [addSite, { isLoading }] = useAddSiteMutation()
  const [readNotification] = useLazyReadNotificationQuery()
  const [deleteSite, { isLoading: deleteSideLoading }] = useDeleteSiteMutation()
  const [getSites, { isLoading: sitesListLoading, data: sitesList }] = useLazyGetSitesQuery()
  const [getSiteCrawledInfo, { isLoading: crawlInfoLoading }] = useLazyGetSiteCrawledInfoQuery()
  const [exportToCSV, { isFetching: exportCSVLoading, data: csvData }] = useLazyExportToCSVQuery()
  const [getNotifications, { isLoading: getNotificationLoading }] = useLazyGetNotificationsQuery()
  const [getSiteLinks, { isLoading: siteLinksLoading, data: siteLinks }] = useLazyGetSiteLinksQuery()
  const [getSiteKeywords, { data: keywordsData, isLoading: keywordsLoading }] = useLazyGetSiteKeywordsQuery()
  const [getSitePathSearchResults, { isLoading: sitePathSearchLoading }] = useLazyGetSitePathSearchResultsQuery()
  const [getSightInsights, { isLoading: insightsLoading, data: insightsData }] = useLazyGetSightInsightsQuery()

  const stepsCount = steps(control)?.length

  const handleNext = async () => {
    const script = getValues('script')
    if (currentStep >= stepsCount) return
    if (currentStep === 2 && !script) {
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

  const getNotificationList = async (payload: NotificationAPIPayloadTypes) => {
    try {
      const response = await getNotifications(payload).unwrap()
      const mergedData = [...(notificationsData?.data || []), ...response.data]
      const uniqueData = uniqBy(mergedData, (item) => item.id)
      const isScrolling = payload.page > 1
      dispatch(setNotificationsData({ ...notificationsData, ...response, data: isScrolling ? uniqueData : response.data }))
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const handleReadNotification = async (payload: { id: string }) => {
    try {
      await readNotification(payload).unwrap()
      const modifiedData = notificationsData?.data?.map((item) => {
        if (item.id === payload.id) {
          return { ...item, read: true }
        }
        return item
      })
      dispatch(setNotificationsData({ ...notificationsData, data: modifiedData, unread_count: notificationsData.unread_count - 1 }))
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const handleGetSiteLinks = async (payload: SiteLinkPayloadTypes) => {
    try {
      await getSiteLinks(payload, true).unwrap()
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const getPathSearchResults = async (payload: { path: string; site_id: string }) => {
    try {
      const data = await getSitePathSearchResults(payload, true).unwrap()
      return data?.data
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const getInsights = async (payload: { url: string }) => {
    try {
      await getSightInsights(payload, true).unwrap()
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const getKeywords = async (payload: GetKeywordsPayload) => {
    try {
      const data = await getSiteKeywords(payload, true).unwrap()
      setValue('keywords', data.data)
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const exportDataToCSV = async (site_id: { site_id: string }) => {
    try {
      const data = await exportToCSV(site_id).unwrap()
      const transactionColumns = [
        {
          header: 'Link',
          key: 'Link',
        },
        {
          header: 'Type',
          key: 'Type',
        },
        {
          header: 'Suggested',
          key: 'Suggested',
        },
        {
          header: 'Approved',
          key: 'Approved',
        },
      ]

      createSingleExcelFile({ csvData: { data: data?.data || [], columns: transactionColumns }, fileName: 'approved-recommendations' })
      return data?.data
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const getSiteCrawledInfoData = async (payload: { site_id: string; link_id?: string }) => {
    try {
      const data = await getSiteCrawledInfo(payload, false).unwrap()
      dispatch(setCrawledInfo(data?.data))
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
    csvData,
    isLoading,
    getKeywords,
    getInsights,
    currentStep,
    getSitesList,
    keywordsData,
    submitHandler,
    exportDataToCSV,
    keywordsLoading,
    insightsLoading,
    crawlInfoLoading,
    exportCSVLoading,
    handleDeleteSite,
    sitesListLoading,
    siteLinksLoading,
    deleteSideLoading,
    notificationsData,
    handleGetSiteLinks,
    getNotificationList,
    siteLinks: siteLinks,
    getPathSearchResults,
    sitePathSearchLoading,
    handleReadNotification,
    getNotificationLoading,
    getSiteCrawledInfoData,
    crawledInfo: crawledInfo,
    handleForwardButtonPress,
    handlePreviousButtonPress,
    sitesList: sitesList?.data || [],
    insightsData: insightsData?.result,
  }
}

export default useHandleSitesLogic
