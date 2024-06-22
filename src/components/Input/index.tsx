'use client'

import { useRef } from 'react'

import Typography from '../Typography/Typography'

import { InputTypes } from './types'

import { classMapper } from '@/utils/helper'

import './Input.scss'

const Input = ({
  placeholder,
  name,
  type,
  disabled,
  required,
  error = '',
  title,
  variant = 'outlined',
  size = 'md',
  value,
  titlePosition = 'inside',
  color = 'primary',
  borderRadius = false,
  hideIncrementNumber = false,
  StartIcon,
  EndIcon,
  onChange,
}: InputTypes) => {
  const inputRef = useRef<HTMLFieldSetElement>(null)

  const classes = classMapper(
    'input-field',
    { [variant]: variant },
    { [size]: size },
    { error: error && !disabled },
    { focused: value || (error && !disabled) ? true : false },
    { [titlePosition]: titlePosition && title },
    { [color]: color },
    { 'hide-number-increment': hideIncrementNumber },
    { radius: borderRadius && variant !== 'underlined' },
    { startIcon: !!StartIcon },
    { endIcon: !!EndIcon },
    { required: required && title }
  )

  const isStartSvgIcon = typeof StartIcon === 'object' && StartIcon?.type === 'svg'
  const StartIconPassed = isStartSvgIcon ? StartIcon : <img src={StartIcon as string} alt="button logo" />

  const isEndSvgIcon = typeof EndIcon === 'object' && EndIcon?.type === 'svg'
  const EndIconPassed = isEndSvgIcon ? EndIcon : <img src={EndIcon as string} alt="button logo" />

  const topTitle = titlePosition === 'top' && <Typography text={<label htmlFor={title}>{title}</label>} />

  const errorMessage = error && !disabled && <p className="error-text">{error}</p>

  return (
    <div className="input-field-container">
      {topTitle}
      <fieldset className={classes} ref={inputRef} disabled={disabled}>
        {title && <legend>{title}</legend>}
        {StartIcon && StartIconPassed}
        <input
          autoComplete="new-password"
          id={title}
          placeholder={placeholder}
          name={name}
          type={type}
          disabled={disabled}
          required={required}
          value={value}
          onBlur={() => {
            if (value || error) return
            inputRef.current?.classList.remove('focused')
          }}
          onFocus={() => inputRef.current?.classList.add('focused')}
          onChange={onChange}
        />
        {EndIcon && EndIconPassed}
      </fieldset>
      {errorMessage}
    </div>
  )
}

export default Input
