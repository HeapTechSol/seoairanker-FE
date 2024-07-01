import React from 'react';

import './Avatar.scss';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large' | number;
  shape?: 'circle' | 'square';
  fallback?: string | React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'medium',
  shape = 'circle',
  fallback,
  className = '',
  onClick,
}) => {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getSize = () => {
    if (typeof size === 'number') {
      return size;
    }
    switch (size) {
      case 'small':
        return 32;
      case 'large':
        return 48;
      case 'medium':
      default:
        return 40;
    }
  };

  const avatarSize = getSize();
  const avatarStyle = {
    width: avatarSize,
    height: avatarSize,
    minWidth: avatarSize,
    minHeight: avatarSize,
  };

  const classes = `avatar ${shape} ${className} ${onClick ? 'clickable' : ''}`.trim();

  const renderContent = () => {
    if (!imageError && src) {
      return <img src={src} alt={alt} onError={handleImageError} />;
    }

    if (fallback) {
      return typeof fallback === 'string' ? (
        <span className="fallback-text">{fallback}</span>
      ) : (
        fallback
      );
    }

    return <span className="fallback-text">{alt.charAt(0).toUpperCase()}</span>;
  };

  return (
    <div className={classes} style={avatarStyle} onClick={onClick}>
      {renderContent()}
    </div>
  );
};

export default Avatar;