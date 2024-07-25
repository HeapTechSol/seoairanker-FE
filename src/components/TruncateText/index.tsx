import React from 'react'
import { TruncateTextTypes } from './types'
import { classMapper } from '@/utils/helper'

import './TruncateText.scss'

const TruncateText: React.FC<TruncateTextTypes> = ({ text, width, line }) => {
  const classes = classMapper('truncate-text', {
    [`truncate-text--line-${line}`]: !!line,
  })

  const style = {
    width: width ? `${width}px` : '100%', // Default to 100% if width is not provided
  }

  const titleText = typeof text === 'string' ? text : ''

  return (
    <div className={classes} style={style} title={titleText}>
      {text}
    </div>
  )
}

export default TruncateText
