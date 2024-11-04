import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { ErrorTypes } from '@/utils/commonTypes'

import { useApproveSchemaRecommendationMutation, useLazyGetSchemaPagesDataQuery, useLazyGetSchemaPagesListQuery } from '../api/sitesAPI'
import {
  AllModalDataTypes,
  ApproveSchemaPayloadTypes,
  GetSchemaTypesPayloadTypes,
  ModalTypes,
  SchemaPagesListPayloadTypes,
} from '../sitesTypes'
import { setSchemaPagesData, setSchemaPagesList } from '../sitesSlice'

import { uniqBy } from '@/utils/helper'
import { useAppSelector } from '@/api/store'

const useSchemaRecommendations = () => {
  const { id: siteId } = useParams()
  const dispatch = useDispatch()

  const [isBulkApproveLoading, setIsBulkApproveLoading] = useState<boolean>(false)
  const [isSingleApproveLoading, setIsSingleApproveLoading] = useState<boolean>(false)
  const [isSubBulkApproveLoading, setIsSubBulkApproveLoading] = useState<boolean>(false)

  const [approveSchemaRecommendations] = useApproveSchemaRecommendationMutation()

  const [getSchemaPagesData, { isFetching: schemaPagesLoading }] = useLazyGetSchemaPagesDataQuery()
  const [getSchemaPagesList, { isFetching: schemaPagesTypesLoading, data: schemaPagesList }] = useLazyGetSchemaPagesListQuery()

  const schemaPagesData = useAppSelector((state) => state.sites.schemaPagesData)

  const handleUpdateSchemaStatus = async (payload: ApproveSchemaPayloadTypes) => {
    try {
      if (!payload.schemaType && payload.bulk) setIsBulkApproveLoading(true)
      else if (payload.schemaType && payload.bulk) setIsSubBulkApproveLoading(true)
      else if (payload.schemaType && !payload.bulk) setIsSingleApproveLoading(true)
      const data = await approveSchemaRecommendations(payload).unwrap()
      toast.success(data?.message || '')
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    } finally {
      setIsBulkApproveLoading(false)
      setIsSingleApproveLoading(false)
      setIsSubBulkApproveLoading(false)
    }
  }

  const getSchemaPages = async (payload: GetSchemaTypesPayloadTypes & { link_id: string }) => {
    try {
      const data = await getSchemaPagesData({ ...payload, site_id: siteId || '' }).unwrap()
      const mergedData = [...(schemaPagesData?.data || []), ...(data?.data || [])]
      const uniqueData = uniqBy(mergedData, (item) => item.id)
      const isScrolling = payload.page > 1
      dispatch(
        setSchemaPagesData({
          ...schemaPagesData,
          ...data,
          data: ((isScrolling ? uniqueData : data?.data) as AllModalDataTypes) || [],
          modal: payload.type as ModalTypes,
          page: payload.page,
          per_page: payload.per_page,
        })
      )
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const getSchemaPagesListTypes = async (payload: SchemaPagesListPayloadTypes) => {
    try {
      const data = await getSchemaPagesList(payload).unwrap()
      dispatch(setSchemaPagesList(data.data))
      return data.data[0]
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  return {
    isBulkApproveLoading,
    isSingleApproveLoading,
    isSubBulkApproveLoading,
    getSchemaPages,
    schemaPagesData: schemaPagesData,
    schemaPagesList: schemaPagesList?.data || [],
    schemaPagesLoading,
    schemaPagesTypesLoading,
    getSchemaPagesListTypes,
    handleUpdateSchemaStatus,
  }
}

export default useSchemaRecommendations
