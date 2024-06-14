import { classMapper } from '@/utils/helper'
import { ColorsTypes } from '@/utils/commonTypes'

import './CircularProgress.scss'

type CircularProgressProps = {
  progress: number
  size?: number
  color?:ColorsTypes
}

const CircularProgress = ({ progress, size = 40, color = 'primary' }: CircularProgressProps) => {
  const circleCSSClasses = classMapper('progress-circle', { [color]: true })
  return (
    <div
      className={circleCSSClasses}
      data-value={progress}
      style={{ '--progress': progress + '%', '--size': size ? `${size}px` : undefined } as React.CSSProperties}
    ></div>
  )
}

export default CircularProgress
