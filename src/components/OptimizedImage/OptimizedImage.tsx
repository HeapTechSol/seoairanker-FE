import React from 'react';
import './OptimizedImage.scss';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  layout?: 'fixed' | 'responsive' | 'fill';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  className?: string;
}

const OptimizedImage: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  layout = 'responsive',
  objectFit = 'cover',
  priority = false,
  loading = 'lazy',
  className = '',
}) => {
  const [imageSrc, setImageSrc] = React.useState(src);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    setImageSrc(src);
  }, [src]);

  const handleLoad = () => {
    setLoaded(true);
  };

  const imgStyle: React.CSSProperties = {
    objectFit,
    opacity: loaded ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
  };

  const wrapperStyle: React.CSSProperties = layout === 'fill' ? {
    position: 'relative',
    width: '100%',
    height: '100%',
  } : {
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : '100%',
  };

  return (
    <div className={`optimized-image-container ${className}`} style={wrapperStyle}>
      <img
        src={imageSrc}
        alt={alt}
        width={layout !== 'fill' ? width : undefined}
        height={layout !== 'fill' ? height : undefined}
        style={imgStyle}
        loading={priority ? 'eager' : loading}
        onLoad={handleLoad}
      />
      {!loaded && <div className="image-placeholder" />}
    </div>
  );
};

export default OptimizedImage;
