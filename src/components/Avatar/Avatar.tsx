import React, { useRef } from 'react'

import { FaRegEdit } from 'react-icons/fa'

import './Avatar.scss'

interface AvatarProps {
  src?: string
  alt?: string
  className?: string
  tempImageSrc?: string | File
  onClick?: () => void
  showEditIcon?: boolean
  shape?: 'circle' | 'square'
  onImageUpload?: (file: File) => void
  fallback?: string | React.ReactNode
  size?: 'small' | 'medium' | 'large' | number
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  onClick,
  fallback,
  tempImageSrc,
  alt = 'Avatar',
  className = '',
  size = 'medium',
  onImageUpload,
  shape = 'circle',
  showEditIcon = false,
}) => {
  const [imageError, setImageError] = React.useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageError = () => {
    setImageError(true)
  }

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && onImageUpload) {
      onImageUpload(file)
    }
  }

  const getSize = () => {
    if (typeof size === 'number') {
      return size
    }
    switch (size) {
      case 'small':
        return 32
      case 'large':
        return 48
      case 'medium':
      default:
        return 40
    }
  }

  const avatarSize = getSize()
  const avatarStyle = {
    width: avatarSize,
    height: avatarSize,
    minWidth: avatarSize,
    minHeight: avatarSize,
  }

  const classes = `avatar ${shape} ${className} ${onClick ? 'clickable' : ''}`.trim()

  const renderContent = () => {
    if (tempImageSrc && tempImageSrc instanceof File) {
      const objectUrl = URL.createObjectURL(tempImageSrc as File)
      return <img src={objectUrl} alt={alt} />
    }

    if (!imageError && src) {
      return <img src={src} alt={alt} onError={handleImageError} />
    }

    if (fallback) {
      return typeof fallback === 'string' ? <span className="fallback-text">{fallback}</span> : fallback
    }

    return <span className="fallback-text">{alt.charAt(0).toUpperCase()}</span>
  }

  return (
    <div className={classes} style={avatarStyle} onClick={onClick}>
      {renderContent()}
      {showEditIcon && (
        <>
          <span className="edit-icon" onClick={handleIconClick}>
            <FaRegEdit />
          </span>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} accept="image/*" />
        </>
      )}
    </div>
  )
}

export default Avatar
