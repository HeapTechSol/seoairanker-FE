import React from 'react'

import { classMapper } from '@/utils/helper'

import './OptimizedImage.scss'

interface ImageProps {
  src?: string
  alt: string
  width?: number
  height?: number
  layout?: 'fixed' | 'responsive' | 'fill'
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  priority?: boolean
  loading?: 'lazy' | 'eager'
  quality?: number
  className?: string
}

const OptimizedImage: React.FC<ImageProps> = ({
  src = '',
  className = '',
  alt,
  width,
  height,
  layout = 'responsive',
  objectFit = 'cover',
  priority = false,
  loading = 'lazy',
  // quality = 75,
}) => {
  const [imageSrc, setImageSrc] = React.useState(src)

  React.useEffect(() => {
    setImageSrc(src)
  }, [src])

  const imgStyle: React.CSSProperties = {
    objectFit,
  }

  if (layout === 'fill') {
    imgStyle.position = 'absolute'
    imgStyle.top = 0
    imgStyle.left = 0
    imgStyle.bottom = 0
    imgStyle.right = 0
  }

  const scssClasses = classMapper('optimized-image-container', { [className]: className })

  return (
    <div style={{ position: layout === 'fill' ? 'relative' : 'static', width, height }} className={scssClasses}>
      <img
        src={imageSrc}
        alt={alt}
        width={layout !== 'fill' ? width : undefined}
        height={layout !== 'fill' ? height : undefined}
        style={imgStyle}
        loading={priority ? 'eager' : loading}
      />
    </div>
  )
}

export default OptimizedImage
