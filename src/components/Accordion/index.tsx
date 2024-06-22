import { useRef } from 'react'

import Flex from '../Flex'
import TruncateText from '../TruncateText'

import { AccordionTypes } from './types'
import { classMapper } from '@/utils/helper'
import { ArrowDownIcon } from '@/assets/icons/svgs'

import './Accordion.scss'

const Accordion = ({ description, title, color = 'primary', arrowIcon = true, onTitleClick = false, ActionButton }: AccordionTypes) => {
  const accordionRef = useRef<HTMLDivElement>(null)

  const clickHandler = () => {
    if (accordionRef.current) accordionRef.current.classList.toggle('open')
  }

  const classes = classMapper('accordion-container container-bg', {
    [color]: color,
    onTitleClick: onTitleClick,
  })

  return (
    <div className={classes} ref={accordionRef}>
      <div className="accordion-container-header container-bg" onClick={clickHandler}>
        <div className="header-title">
          <TruncateText text={(title as string) || ''} width={500} line={1} />
        </div>
        <Flex align="center" gap={20} justify="end">
          {ActionButton && ActionButton}
          {arrowIcon && <div className="header-icon">{ArrowDownIcon}</div>}
        </Flex>
      </div>
      <div className="accordion-container-description">{description}</div>
    </div>
  )
}

export default Accordion
