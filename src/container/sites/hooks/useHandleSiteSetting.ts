import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocation, useSearchParams, useNavigate, useParams } from 'react-router-dom'

import { ErrorTypes } from '@/utils/commonTypes'
import { AddKeywordsDefaultValues } from '../sitesTypes'
import { useLazySaveKeywordsQuery } from '../api/sitesAPI'
import { ADD_KEYWORDS_DEFAULT_VALUES, ADD_KEYWORDS_VALIDATIONS } from '../utils'

const useHandleSiteSetting = () => {
  const navigate = useNavigate()
  const { id: siteId } = useParams()
  const [searchParams] = useSearchParams()
  const location = useLocation()

  const { control, reset, setValue, getValues, handleSubmit } = useForm<AddKeywordsDefaultValues>({
    defaultValues: ADD_KEYWORDS_DEFAULT_VALUES,
    resolver: zodResolver(ADD_KEYWORDS_VALIDATIONS),
  })

  const [saveKeywords, { isLoading }] = useLazySaveKeywordsQuery()

 
  const handleClearKeywordData = () => {
    reset()
  }

  return { control, setValue, getValues, isLoading, handleClearKeywordData }
}

export default useHandleSiteSetting
