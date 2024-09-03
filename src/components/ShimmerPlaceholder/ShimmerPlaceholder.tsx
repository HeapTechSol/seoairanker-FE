import React, { ReactNode } from 'react'

import './ShimmerPlaceholder.scss'

export type ShimmerPlaceholderProps = {
  children: ReactNode
  loading: boolean
  type?: 'bar' | 'square'
  count?: number
  height?: number | string
  width?: number | string
  gap?: number
  flexDirection?: 'column' | 'row'
}

const ShimmerPlaceholder: React.FC<ShimmerPlaceholderProps> = ({
  children,
  flexDirection = 'column',
  loading,
  type,
  count = 10,
  height = 50,
  width = '100%',
  gap = 10,
}) => {
  if (!loading) return <>{children}</>

  const shimmerStyle: React.CSSProperties = {
    height: typeof height === 'number' ? `${height}px` : height,
    width: typeof width === 'number' ? `${width}px` : width,
    borderRadius: type === 'square' ? '5px' : '3px',
  }

  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    gap: `${gap}px`,
    flexDirection: flexDirection,
    flexWrap: 'wrap',
  }

  return (
    <div className="shimmer-wrapper" style={wrapperStyle}>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="shimmer-item" style={shimmerStyle}></div>
      ))}
    </div>
  )
}

export default ShimmerPlaceholder
