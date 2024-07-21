import React, { useState, useEffect, useRef } from 'react'

import Input from '../Input'

import { InputTypes } from '../Input/types'

import './SearchInput.scss'
import { isEmpty } from '@/utils/helper'

interface SearchResult {
  id: string | number
  label: string
}

interface SearchInputProps extends InputTypes {
  onSearch: (query: string) => Promise<SearchResult[]>
  onSelectResult: (result: SearchResult) => void
  handleClearSelection?: (val: boolean) => void
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, onSelectResult, handleClearSelection, ...inputProps }) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [isItemSeleted, setIsItemSelected] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearch = async (query: string) => {
    if (query.trim() === '') {
      setSearchResults([])
      setShowDropdown(false)
      return
    }

    setIsLoading(true)
    try {
      const results = await onSearch(query)
      setSearchResults(results)
      setShowDropdown(true)
    } catch (error) {
      console.error('Error fetching search results:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectResult = (result: SearchResult) => {
    onSelectResult(result)
    setIsItemSelected(true)
    setShowDropdown(false)
  }

  const handleResetSelection = () => {
    setSearchResults([])
    handleClearSelection?.(isItemSeleted)
    setIsItemSelected(false)
  }

  return (
    <div className="search-input-container">
      <Input
        {...inputProps}
        onEnterPress={(e) => {
          inputProps.onEnterPress?.(e)
          handleSearch(e)
        }}
        onClear={handleResetSelection}
        onClick={() => !isEmpty(searchResults) && setShowDropdown(true)}
      />
      {showDropdown && (
        <div className="search-results-dropdown" ref={dropdownRef}>
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : searchResults?.length > 0 ? (
            <ul>
              {searchResults?.map((result) => (
                <li key={result.id} onClick={() => handleSelectResult(result)}>
                  {result.label}
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-results">No results found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchInput
