import React from 'react'
import classNames from 'classnames'
import { TruncateTextTypes } from './types'

import './TruncateText.scss'

const TruncateText: React.FC<TruncateTextTypes> = ({ text, width, line }) => {
  const classes = classNames('truncate-text', {
    [`truncate-text--line-${line}`]: line,
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
