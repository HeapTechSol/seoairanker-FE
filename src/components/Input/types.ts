import React from 'react'

export type InputTypes = {
  placeholder?: string
  name: string
  disabled?: boolean
  required?: boolean
  fullWidth?: boolean
  error?: string
  onClear?: () => void
  title?: string
  titlePosition?: 'top' | 'inside'
  size?: 'sm' | 'md' | 'lg'
  value?: string | number
  type?: 'text' | 'number' | 'password' | 'email'
  variant?: 'outlined' | 'underlined'
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  borderRadius?: boolean
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void
  onEnterPress?: (value: string) => void
  StartIcon?: string | JSX.Element
  EndIcon?: string | JSX.Element
  ClearSearchIcon?: string | JSX.Element
  hideIncrementNumber?: boolean
  autoComplete?: string
}
