import { useState, useRef } from 'react'
import Flex from '../Flex'
import TruncateText from '../TruncateText'
import { AccordionTypes } from './types'
import { classMapper } from '@/utils/helper'
import { ArrowDownIcon } from '@/assets/icons/svgs'
import './Accordion.scss'

const Accordion = ({
  description,
  title,
  color = 'primary',
  className = '',
  arrowIcon = true,
  onTitleClick = false,
  ActionButton,
}: AccordionTypes) => {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const clickHandler = () => {
    setIsOpen(!isOpen)
  }

  const classes = classMapper('accordion-container', {
    [color]: color,
    [className]: className,
    onTitleClick: onTitleClick,
    open: isOpen,
  })

  return (
    <div className={classes}>
      <div className="accordion-container-header container-bg" onClick={clickHandler}>
        <div className="header-title">
          <TruncateText text={(title as string) || ''} width={500} line={1} />
        </div>
        <Flex align="center" gap={20} justify="end">
          {ActionButton && ActionButton}
          {arrowIcon && <div className="header-icon">{ArrowDownIcon}</div>}
        </Flex>
      </div>
      <div className="accordion-container-description" ref={contentRef}>
        {description}
      </div>
    </div>
  )
}

export default Accordion
