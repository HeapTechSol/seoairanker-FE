import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { AddKeywordsDefaultValues } from '../sitesTypes'
import { useSaveKeywordsMutation } from '../api/sitesAPI'
import { ADD_KEYWORDS_DEFAULT_VALUES, ADD_KEYWORDS_VALIDATIONS } from '../utils'

const useHandleSiteSetting = () => {
  const { control, setValue, getValues } = useForm<AddKeywordsDefaultValues>({
    defaultValues: ADD_KEYWORDS_DEFAULT_VALUES,
    resolver: zodResolver(ADD_KEYWORDS_VALIDATIONS),
  })

  const [saveKeywords, { isLoading }] = useSaveKeywordsMutation()

  const handleClearKeywordData = () => {
    saveKeywords
  }

  return { control, setValue, getValues, isLoading, handleClearKeywordData }
}

export default useHandleSiteSetting
