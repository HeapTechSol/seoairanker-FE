import React, { useState, useRef, useEffect, ReactElement } from 'react'

import './Dropdown.scss'

type Option<T> = {
  id: T
  name: string | JSX.Element | React.ReactNode
}

type DropdownProps<T> = {
  options: Option<T>[]
  onSelect: (option: Option<T>) => void
  children: ReactElement
}

function Dropdown<T>({ options, onSelect, children }: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const [menuPosition, setMenuPosition] = useState<'left' | 'right'>('left')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)

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

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (option: Option<T>) => {
    onSelect(option)
    setIsOpen(false)
  }

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div ref={triggerRef} onClick={handleToggle}>
        {children}
      </div>
      {isOpen && (
        <ul className={`dropdown-menu ${menuPosition}`} ref={menuRef}>
          {options.map((option, index) => (
            <li key={index} onClick={() => handleSelect(option)}>
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
