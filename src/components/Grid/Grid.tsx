import React from 'react'
import { classMapper } from '@/utils/helper'
import './Grid.scss'

type GridPropsTypes = {
  gap?: number
  justify?: 'center' | 'start' | 'end' | 'stretch'
  align?: 'center' | 'start' | 'end' | 'stretch'
  children: React.ReactNode
  className?: string
  wrap?: boolean
  inline?: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement>
  style?: React.CSSProperties
  minMax?: number
  minWidth?: number
}

const Grid = React.forwardRef<HTMLDivElement, GridPropsTypes>((props, ref) => {
  const { 
    gap = 25, 
    justify, 
    align, 
    children, 
    className, 
    wrap = false, 
    inline = false, 
    onClick, 
    style, 
    minMax = 200,
    minWidth
  } = props

  const gridClasses = classMapper(`grid-container`, {
    [className || '']: !!className,
    inline: inline,
    wrap: wrap,
    [`justify-${justify}`]: justify,
    [`align-${align}`]: align,
  })

  const inlineStyle = {
    ...style,
    gap: `${gap}px`,
    gridGap: `${gap}px`,
    gridTemplateColumns: minWidth 
      ? `repeat(auto-fit, minmax(max(${minWidth}px, ${minMax}px), 1fr))`
      : `repeat(auto-fit, minmax(${minMax}px, 1fr))`,
  }

  return (
    <div style={inlineStyle} className={gridClasses} onClick={onClick} ref={ref}>
      {children}
    </div>
  )
})

export default Grid