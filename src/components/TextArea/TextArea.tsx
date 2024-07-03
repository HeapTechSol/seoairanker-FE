import { useRef } from 'react'

import { classMapper } from '@/utils/helper'
import { TextAreaTypes } from './TextAreaTypes'

import './TextArea.scss'

const TextArea = ({
  placeholder,
  name,
  disabled,
  required,
  error = '',
  title,
  size = 'md',
  value,
  color = 'primary',
  borderRadius = false,
  isResizeAble = true,
  onChange,
}: TextAreaTypes) => {
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const classes = classMapper(
    'textarea-field-container',
    { [size]: size },
    { error: error && !disabled },
    { focused: !!(value || (error && !disabled)) },
    { [color]: color },
    { radius: borderRadius },
    { required: required && title }
  )

  const topTitle = <label htmlFor={title}>{title}</label>

  const errorMessage = error && !disabled && <p className="error-text">{error}</p>

  return (
    <div className={classes}>
      {topTitle}
      <textarea
        autoComplete="new-password"
        id={title}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        required={required}
        ref={inputRef}
        style={{ resize: isResizeAble ? 'vertical' : 'none' }}
        value={value}
        onBlur={() => {
          if (value || error) return
          inputRef.current?.classList.remove('focused')
        }}
        onFocus={() => inputRef.current?.classList.add('focused')}
        onChange={onChange}
      />
      {errorMessage}
    </div>
  )
}

export default TextArea
