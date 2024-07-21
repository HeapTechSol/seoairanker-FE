import { useRef, KeyboardEvent, InputHTMLAttributes } from 'react'

import Typography from '../Typography/Typography'

import { InputTypes } from './types'

import { classMapper } from '@/utils/helper'

import './Input.scss'

type CustomInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputTypes> & InputTypes

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
  ClearSearchIcon,
  autoComplete = 'new-password',
  onChange,
  onEnterPress,
  onClear,
  ...restProps
}: CustomInputProps) => {
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
    { endIcon: !!EndIcon || !!ClearSearchIcon },
    { required: required && title }
  )

  const topTitle = titlePosition === 'top' && <Typography text={<label htmlFor={title}>{title}</label>} />

  const errorMessage = error && !disabled && <p className="error-text">{error}</p>

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && onEnterPress) {
      onEnterPress(event.currentTarget.value)
    }
  }

  return (
    <div className="input-field-container">
      {topTitle}
      <fieldset className={classes} ref={inputRef} disabled={disabled}>
        {title && <legend>{title}</legend>}
        {StartIcon && StartIcon}
        <input
          autoComplete={autoComplete}
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
          onKeyPress={handleKeyPress}
          {...restProps}
        />
        {EndIcon && EndIcon}
        {ClearSearchIcon && value && (
          <div onClick={() => onClear?.()} style={{ cursor: 'pointer' }}>
            {ClearSearchIcon}
          </div>
        )}
      </fieldset>
      {errorMessage}
    </div>
  )
}

export default Input
