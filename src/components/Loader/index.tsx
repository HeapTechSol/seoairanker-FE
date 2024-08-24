import { useState, useEffect } from 'react'
import LoadingIcon from '@/assets/icons/loader.gif'

import { LoaderProps } from './types'

import './Loader.scss'

const Loader = ({ loading, overlay = true, size = 0, delay = 0, children }: LoaderProps) => {
  const [showLoader, setShowLoader] = useState(!delay)

  useEffect(() => {
    if (delay && delay > 0) {
      let timer: NodeJS.Timeout

      if (loading) {
        timer = setTimeout(() => {
          setShowLoader(true)
        }, delay)
      } else {
        // @ts-ignore
        clearTimeout(timer)
        setShowLoader(false)
      }

      return () => clearTimeout(timer)
    } else {
      setShowLoader(loading)
    }
  }, [loading, delay])

  if (!showLoader) {
    return <>{children}</>
  }

  return (
    <div className={`loader-container ${overlay ? 'overlay' : 'underlay'}`}>
      <div className="loader" style={{ width: size ? `${size}px` : '50px', height: size ? `${size}px` : '50px' }}>
        <img src={LoadingIcon} alt="loader" />
      </div>
    </div>
  )
}

export default Loader
