import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocation, useSearchParams, useNavigate, useParams } from 'react-router-dom'

import { ErrorTypes } from '@/utils/commonTypes'
import { AddKeywordsDefaultValues } from '../sitesTypes'
import { useSaveKeywordsMutation } from '../api/sitesAPI'
import { ADD_KEYWORDS_DEFAULT_VALUES, ADD_KEYWORDS_VALIDATIONS } from '../utils'

const useAddNewKeyword = () => {
  const navigate = useNavigate()
  const { id: siteId } = useParams()
  const [searchParams] = useSearchParams()
  const location = useLocation()

  const { control, reset, setValue, getValues, handleSubmit } = useForm<AddKeywordsDefaultValues>({
    defaultValues: ADD_KEYWORDS_DEFAULT_VALUES,
    resolver: zodResolver(ADD_KEYWORDS_VALIDATIONS),
  })

  const [saveKeywords, { isLoading }] = useSaveKeywordsMutation()

  const navigateToTab = (tabName: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('tab', tabName.toLowerCase())

    navigate({
      pathname: location.pathname,
      search: newSearchParams.toString(),
    })
  }

  const onSaveKeywords = async (values: AddKeywordsDefaultValues) => {
    try {
      const data = await saveKeywords({ ...values, keywords: values.keywords.split('\n'), site_id: siteId || '' }).unwrap()
      toast.success(data.message || '')
      navigateToTab('site_overview')
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const handleSaveKeywords = () => {
    handleSubmit(onSaveKeywords)()
  }

  const handleClearKeywordData = () => {
    reset()
  }

  return { control, setValue, getValues, isLoading, handleSaveKeywords, handleClearKeywordData }
}

export default useAddNewKeyword
