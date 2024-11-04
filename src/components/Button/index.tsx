import { forwardRef, KeyboardEvent, ForwardedRef } from 'react'

import LoadingIcon from '@/assets/icons/loader.gif'

import { classMapper } from '@/utils/helper'

import { ButtonTypes } from './types'

import './Button.scss'

const Button = forwardRef(
  (
    {
      children,
      size = 'md',
      color = 'primary',
      variant = 'filled',
      disabled = false,
      StartIcon,
      EndIcon,
      loading = false,
      className = '',
      onlyIcon = false,
      type = 'square',
      fullWidth = false,
      noPadding = false,
      fill = false,
      onClick,
      id = '',
    }: ButtonTypes,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const classes = classMapper('btn', {
      [size]: size,
      [variant]: variant,
      [className]: className,
      [color]: color,
      fullWidth: fullWidth,
      pointer: !!onClick,
      'icon-button': (StartIcon || EndIcon) && onlyIcon,
      [type]: type === 'circle' && !onlyIcon ? false : true,
      noPadding: noPadding,
      fill: fill,
    })

    const loader =  loading && <img src={LoadingIcon} alt="loading-icon" />

    const onEnterPress = (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter') {
        onClick?.(e)
      }
    }

    return (
      <button
        className={classes}
        disabled={disabled}
        onClick={(e) => !loading && onClick?.(e)}
        onKeyDown={(e) => !loading && onEnterPress?.(e)}
        id={id}
        role="button"
        ref={ref}
      >
        {StartIcon && StartIcon}
        {children && !onlyIcon && children}
        {EndIcon && EndIcon}
        {!onlyIcon && loader}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
