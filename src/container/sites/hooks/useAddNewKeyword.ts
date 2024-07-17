import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

import { ErrorTypes } from '@/utils/commonTypes'
import { AddKeywordsDefaultValues } from '../sitesTypes'
import { useLazySaveKeywordsQuery } from '../api/sitesAPI'
import { ADD_KEYWORDS_DEFAULT_VALUES, ADD_KEYWORDS_VALIDATIONS } from '../utils'

const useAddNewKeyword = () => {
  const { state } = useLocation()
  const { control, reset, setValue, getValues, handleSubmit } = useForm<AddKeywordsDefaultValues>({
    defaultValues: ADD_KEYWORDS_DEFAULT_VALUES,
    resolver: zodResolver(ADD_KEYWORDS_VALIDATIONS),
  })

  const [saveKeywords, { isLoading }] = useLazySaveKeywordsQuery()

  const onSaveKeywords = async (values: AddKeywordsDefaultValues) => {
    try {
      await saveKeywords({ ...values, keywords: values.keywords.split('\n'), site_id: state?.siteId }).unwrap()
      toast.success('Keywords saved successfully')
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
