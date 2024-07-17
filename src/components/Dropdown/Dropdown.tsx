import React, { useState, useRef, useEffect, ReactElement, useCallback } from 'react'

import Loader from '../Loader'
import Typography from '../Typography/Typography'

import { classMapper } from '@/utils/helper'

import './Dropdown.scss'

export type Option<T> = {
  id: T
  name: string | JSX.Element | React.ReactNode
  onClick?: () => void
}

export type DropdownProps<T> = {
  options: Option<T>[]
  onSelect: (option: Option<T>) => void
  children: ReactElement
  className?: string
  onScroll?: () => void
  scrollLoading?: boolean
}

function Dropdown<T>({ options, onSelect, className = '', onScroll, scrollLoading = false, children }: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const [menuPosition, setMenuPosition] = useState<'left' | 'right'>('left')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const observer = useRef<IntersectionObserver>()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isOpen && triggerRef.current && menuRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const menuRect = menuRef.current.getBoundingClientRect()
      const spaceOnRight = window.innerWidth - triggerRect.right
      const menuWidth = menuRect.width

      if (spaceOnRight < menuWidth && triggerRect.left > menuWidth) {
        setMenuPosition('right')
      } else {
        setMenuPosition('left')
      }
    }
  }, [isOpen])

  const lastNotificationRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (scrollLoading || !node) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && navigator.onLine) {
          onScroll?.()
        }
      })
      if (node) observer.current.observe(node)
    },
    [scrollLoading, onScroll]
  )

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (option: Option<T>) => {
    onSelect(option)
    setIsOpen(false)
  }

  const cssClasses = classMapper('dropdown', { [className]: className })

  const isOptionsExist = !!options?.length

  return (
    <div className={cssClasses} ref={dropdownRef}>
      <div ref={triggerRef} onClick={handleToggle}>
        {children}
      </div>

      <ul className={`dropdown-menu ${menuPosition} ${isOpen ? 'open' : ''}`} ref={menuRef}>
        {isOptionsExist ? (
          options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                handleSelect(option)
                option?.onClick?.()
              }}
              ref={index === options.length - 1 ? lastNotificationRef : null}
              className={`${option?.onClick ? 'li-click' : ''}`}
            >
              {option.name}
            </li>
          ))
        ) : (
          <Typography text="There is no Notification" className="empty-notification-message" />
        )}
        <Loader loading={scrollLoading} />
      </ul>
    </div>
  )
}

export default Dropdown
