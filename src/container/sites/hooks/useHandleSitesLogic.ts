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
  useLazyGetNotificationsQuery,
  useLazyGetSiteCrawledInfoQuery,
  useLazyGetSitesQuery,
  useLazyReadNotificationQuery,
} from '../api/sitesAPI'

import { useAppDispatch, useAppSelector } from '@/api/store'
import { EXACT_ROUTES } from '@/constant/routes'
import { ErrorTypes } from '@/utils/commonTypes'
import { AddSitePayloadTypes, GetKeywordsPayload, NotificationAPIPayloadTypes, SiteLinkPayloadTypes } from '../sitesTypes'
import { setNotificationsData } from '../sitesSlice'
import { uniqBy } from '@/utils/helper'

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
  const notificationsData = useAppSelector((state) => state.sites.notificationsData)

  const isSiteQuotaExceeded = (userQuota?.sites_quota_left as number) >= (userQuota?.sites_quota as number)

  const [addSite, { isLoading }] = useAddSiteMutation()
  const [readNotification] = useLazyReadNotificationQuery()
  const [deleteSite, { isLoading: deleteSideLoading }] = useDeleteSiteMutation()
  const [getSites, { isFetching: sitesListLoading, data: sitesList }] = useLazyGetSitesQuery()
  const [getSiteLinks, { isFetching: siteLinksLoading, data: siteLinks }] = useLazyGetSiteLinksQuery()
  const [getSiteKeywords, { data: keywordsData, isFetching: keywordsLoading }] = useLazyGetSiteKeywordsQuery()
  const [getSightInsights, { isFetching: insightsLoading, data: insightsData }] = useLazyGetSightInsightsQuery()
  const [getSiteCrawledInfo, { data: crawledInfo, isFetching: crawlInfoLoading }] = useLazyGetSiteCrawledInfoQuery()
  const [getNotifications, { isFetching: getNotificationLoading }] = useLazyGetNotificationsQuery()

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
    notificationsData,
    handleGetSiteLinks,
    getNotificationList,
    handleReadNotification,
    getNotificationLoading,
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
