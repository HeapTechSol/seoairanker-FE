import React from 'react'
import { toast } from 'react-toastify'
import { format, differenceInMinutes, differenceInHours, differenceInDays, isValid } from 'date-fns'

import { ClassMapperArgsTypes } from './utilTypes'

export const classMapper = (...args: ClassMapperArgsTypes[]) => {
  const classesObject = new Map()

  args.forEach((className: ClassMapperArgsTypes) => {
    if (typeof className === 'string') !classesObject.has(className) && classesObject.set(className, true)

    if (typeof className === 'object')
      Object.entries(className).forEach(([key, value]) => {
        if (!value) return
        classesObject.set(key, true)
      })
  })

  const classes: string[] = []

  classesObject.forEach((_value, key) => classes.push(key))

  return classes.join(' ')
}

export const toggleCSSClasses = (elements: Element[], className: string, action: 'remove' | 'add') =>
  elements?.forEach((item) => item?.classList[action](className))

export const toggleCSSClass = (element: Element | null, className: string, action: 'remove' | 'add') =>
  (element as Element)?.classList[action](className)

export const getMenuId = (menu: Element) => menu.id

export const hasClass = (element: Element, className: string) => element.classList?.contains(className)

export const filterById = (elements: Element[], id: string) => elements.filter((item) => !id?.includes(getMenuId(item)))

export const firstChild = (elements: Element[]) => elements.flatMap((item) => item.firstElementChild)

export const getElement = (element: Element, className: string) => (element ? element.querySelector(`.${className}`) : null)

export const getElements = (elements: Element, className: string) => Array.from(elements.querySelectorAll(`.${className}`))

export const filterByClassName = (elements: Element[], id: string) => {
  const elementsWithMatchedId = filterById(elements, id)
  return firstChild(elementsWithMatchedId)
}

export const filterByClassNameAndOpenClass = (arr: Element[], id: string) => {
  const elementsWithMatchedIdAndOpenClass = arr.filter((item) => id?.includes(getMenuId(item)) && hasClass(item.firstElementChild as Element, 'open'))
  return firstChild(elementsWithMatchedIdAndOpenClass)
}

export const accessElements = (menuRef: React.RefObject<HTMLDivElement>) => {
  const ref = menuRef.current as Element
  const subMenus = getElements(ref, 'submenu')
  const menuItems = getElements(ref, 'menu-link')
  const elementsWithOpenClass = getElements(ref, 'open')
  const subMenusItems = getElements(ref, 'submenu-list-link')
  const subMenuItemWithActiveClass = getElement(ref, 'submenu-list-link.active')

  const subMenuWithActiveClass = subMenuItemWithActiveClass?.closest('.submenu')

  const subMenuHeadingWithActiveChild = getElement(subMenuWithActiveClass as Element, 'submenu-heading')

  return {
    subMenus,
    menuItems,
    elementsWithOpenClass,
    subMenusItems,
    subMenuHeadingWithActiveChild,
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmpty = (obj: any) => [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length

export const arrayGeneratorWithRange = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

export const currencyConverter = (amount: number) => (amount ? amount?.toLocaleString('en-US', { style: 'decimal' }) : '')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleCopyClick = (e: any) => {
  const el = document.createElement('textarea')
  el.value = typeof e === 'string' ? e : ((e.target as HTMLParagraphElement).textContent as string)
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  toast.success('Copied', {
    position: 'bottom-left',
    autoClose: 1000,
  })
}

export const getTime = (date: string | number) => {
  if (!date) return

  const currentDate = new Date()
  const postDate = typeof date === 'string' || typeof date === 'number' ? new Date(date) : null

  if (!isValid(postDate)) return

  const diffInMinutes = differenceInMinutes(currentDate, postDate as Date)

  if (diffInMinutes === 0) {
    return 'just now'
  }

  if (diffInMinutes < 60) {
    return diffInMinutes + 'm ago'
  }

  const diffInHours = differenceInHours(currentDate, postDate as Date)
  if (diffInHours < 24) {
    return diffInHours + 'h ago'
  }

  const diffInDays = differenceInDays(currentDate, postDate as Date)
  if (diffInDays < 7) {
    return diffInDays + 'd ago'
  }

  if ((postDate as Date).getFullYear() === currentDate.getFullYear()) {
    return format(postDate as Date, 'MMM d')
  } else {
    return format(postDate as Date, 'MMM d, yyyy')
  }
}

export const handleFormatCurrencyAndNumber = ({
  style,
  currency = undefined,
  value,
  compactDisplay = 'short',
  notation = 'standard',
  minimumFractionDigits = 0,
  maximumFractionDigits = 2,
}: {
  style?: string
  currency?: string
  value: number
  compactDisplay?: 'short' | 'long' | undefined
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact' | undefined
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}) => {
  const formatter = new Intl.NumberFormat(`en-US`, {
    style,
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
    notation,
    compactDisplay,
  })
  return formatter.format(value) // => 2L
}

export const currencyNumberWithDollar = ({
  value,
  dollarPosition = 'start',
  compactDisplay = 'long',
  notation = 'standard',
  currency = 'USD',
  showUSD = true,
  minimumFractionDigits = 2,
}: {
  value: number
  dollarPosition?: 'start' | 'end'
  compactDisplay?: 'short' | 'long' | undefined
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact' | undefined
  currency?: string
  showUSD?: boolean
  minimumFractionDigits?: number
}) => {
  const formattedValue = handleFormatCurrencyAndNumber({
    style: 'currency',
    value: value,
    compactDisplay: compactDisplay,
    currency: currency,
    notation: notation,
    minimumFractionDigits,
  })

  if (showUSD) {
    return dollarPosition === 'start' ? `USD ${formattedValue}` : `${formattedValue} USD`
  }
  return formattedValue
}

export const convertFirstCharToCapital = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

export const formatDate = (date: string) => {
  return format(new Date(date), 'd MMMM, yyyy')
}

export const formatUnixDate = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp * 1000)
  return format(date, 'd MMMM, yyyy')
}
