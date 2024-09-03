import { ReactNode } from 'react'

import Button from '../Button'

import { IoCloseSharp } from 'react-icons/io5'

import './Drawer.scss'
import Flex from '../Flex'

type DrawerProps = {
  title?: string
  isOpen: boolean
  onClose: () => void
  cancelText?: string
  submitText?: string
  showFooter?: boolean
  onCancel?: () => void
  onSubmit?: () => void
  showCloseIcon?: boolean
  position?: 'left' | 'right'
  disableCancelButton?: boolean
  disableSubmitButton?: boolean
  submitButtonLoading?: boolean
  children: ReactNode | JSX.Element
  footerPosition?: 'center' | 'between' | 'evenly' | 'start' | 'end'
}

const Drawer = ({
  title,
  isOpen,
  onClose,
  onCancel,
  onSubmit,
  children,
  cancelText,
  submitText,
  showFooter = true,
  position = 'right',
  showCloseIcon = true,
  footerPosition = 'end',
  submitButtonLoading = false,
}: DrawerProps) => {
  return (
    <div className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className={`drawer ${position} ${isOpen ? 'open' : 'close'}`} onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          {title && <h2 className="drawer-title">{title}</h2>}
          {showCloseIcon && (
            <Button className="drawer-close" variant="text" type="borderRadius" color="error" onClick={onClose} onlyIcon EndIcon={<IoCloseSharp />} />
          )}
        </div>
        <div className="drawer-content">{children}</div>
        {showFooter && (
          <Flex className={`drawer-footer`} justify={footerPosition}>
            {cancelText && (
              <Button className="drawer-cancel" variant="outlined" onClick={onCancel} type="borderRadius">
                {cancelText}
              </Button>
            )}
            {submitText && (
              <Button className="drawer-submit" onClick={onSubmit} type="borderRadius" loading={submitButtonLoading}>
                {submitText}
              </Button>
            )}
          </Flex>
        )}
      </div>
    </div>
  )
}

export default Drawer
