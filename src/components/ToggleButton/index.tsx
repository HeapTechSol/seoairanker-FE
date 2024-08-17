import { useRef, MouseEvent } from 'react'

import { classMapper } from '@/utils/helper'
import { ToggleButtonTypes } from './types'

import './ToggleButton.scss'

const ToggleButton = ({
  label,
  labelPosition = 'left',
  checked = false,
  disabled = false,
  color = 'primary',
  onChange,
  id = 'toggle',
}: ToggleButtonTypes) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const classes = classMapper('switch-container', {
    [labelPosition]: labelPosition,
    [color]: color,
    disabled: disabled,
  })

  const handleToggle = (e: MouseEvent) => {
    e.preventDefault()
    if (!disabled && inputRef.current) {
      const newCheckedState = !inputRef.current.checked
      inputRef.current.checked = newCheckedState
      onChange?.(newCheckedState)
    }
  }

  return (
    <div className={classes}>
      {label && (
        <label className="label" onClick={handleToggle}>
          {label}
        </label>
      )}
      <div className="switch" onClick={handleToggle}>
        <input
          className="toggle-input"
          id={id}
          ref={inputRef}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(val) => onChange?.(val.target.checked)}
        />
        <label className="slider" htmlFor={id}></label>
      </div>
    </div>
  )
}

export default ToggleButton
