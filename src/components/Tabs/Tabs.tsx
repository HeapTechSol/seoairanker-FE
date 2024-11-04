import React, { useState, useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

import Button from '../Button'

import { classMapper } from '@/utils/helper'
import { ColorsTypes, SizeTypes } from '@/utils/commonTypes'

import './Tabs.scss'

type BaseTab = {
  title: string
  content: React.ReactNode
  hidden?: boolean
}

type TabWithKey = BaseTab & {
  key: string
}

type TabsProps<T extends boolean> = {
  tabs: T extends true ? TabWithKey[] : BaseTab[]
  size?: SizeTypes
  className?: string
  tabColor?: ColorsTypes
  bottomBordered?: boolean
  activeColor?: ColorsTypes
  defaultActiveTab?: number
  variant?: 'outlined' | 'text'
  tabsPlacement?: 'center' | 'left' | 'right'
  contentPlacement?: 'center' | 'left' | 'right'
  activeByUrl: T
}

const Tabs = <T extends boolean>({
  tabs,
  size = 'md',
  className = '',
  variant = 'text',
  tabColor = 'primary',
  defaultActiveTab = 0,
  bottomBordered = false,
  activeColor = 'primary',
  tabsPlacement = 'center',
  contentPlacement = 'center',
  activeByUrl,
}: TabsProps<T>) => {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const getTabFromUrl = () => {
    const tabParam = searchParams.get('tab')
    if (tabParam) {
      const index = (tabs as TabWithKey[]).findIndex((tab) => tab.key.toLowerCase() === tabParam.toLowerCase())
      return index !== -1 ? index : defaultActiveTab
    }
    return defaultActiveTab
  }

  const [activeIndex, setActiveIndex] = useState(getTabFromUrl())

  useEffect(() => {
    if (activeByUrl) {
      setActiveIndex(getTabFromUrl())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, activeByUrl])

  const handleTabClick = (index: number) => {
    setActiveIndex(index)
    if (activeByUrl) {
      const newParams = new URLSearchParams(searchParams)
      newParams.set('tab', (tabs as TabWithKey[])[index].key.toLowerCase())
      setSearchParams(newParams)
    }
  }

  const tabsCSSClasses = classMapper('tabs', {
    bottomBordered: bottomBordered,
    [activeColor]: activeColor,
    [tabsPlacement]: tabsPlacement,
  })

  const buttonCSSClasses = (index: number) =>
    classMapper('btn tabs-button', {
      active: index === activeIndex,
    })

  const tabsButtonContainerCSSClasses = classMapper('tabButtons', {
    [className]: className,
  })

  const tabsContentCSSClasses = classMapper('tabContent', {
    [contentPlacement]: contentPlacement,
  })

  return (
    <div className={tabsCSSClasses}>
      <div className={tabsButtonContainerCSSClasses}>
        {tabs
          ?.filter((item) => !item.hidden)
          ?.map((tab, index) => (
            <Button
              size={size}
              key={index}
              color={tabColor}
              variant={variant}
              type="borderRadius"
              className={buttonCSSClasses(index)}
              onClick={() => handleTabClick(index)}
            >
              {tab.title}
            </Button>
          ))}
      </div>
      <div className={tabsContentCSSClasses}>{tabs[activeIndex].content}</div>
    </div>
  )
}

export default Tabs
