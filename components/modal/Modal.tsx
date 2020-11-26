import classNames from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import isPromise from 'is-promise'

export interface ModalProps {
  visible: boolean
  title: string
  message?: string
  showClose?: boolean
  showBackdrop?: boolean
  closeOnBackdropClick?: boolean
  beforeClose?: () => boolean | Promise<never>
  onClosed?: () => void
}

const Modal: FC<ModalProps> = props => {
  const {
    visible,
    title,
    message,
    showClose,
    showBackdrop,
    closeOnBackdropClick,
    beforeClose,
    onClosed
  } = props

  const [isShow, setShow] = useState(visible)
  useEffect(() => {
    setShow(visible)
  }, [visible])

  async function onCloseClick() {
    if (typeof onClosed !== 'function') return

    if (typeof beforeClose === 'function') {
      const allowClose = beforeClose()
      if (isPromise(allowClose)) {
        await allowClose
        closeAndWaitTransitionEnd()
      } else {
        allowClose && closeAndWaitTransitionEnd()
      }
    } else {
      closeAndWaitTransitionEnd()
    }
  }

  function closeAndWaitTransitionEnd() {
    setShow(false)
    // TODO waitTransitionEnd
    onTransitionEnd()
  }

  function onTransitionEnd() {
    if (typeof onClosed === 'function') {
      onClosed()
    }
  }

  return (
    <div className={classNames('modal', { 'modal--open': isShow })}>
      {showBackdrop && (
        <div
          className='modal-bg'
          onClick={closeOnBackdropClick ? onCloseClick : () => {}}
        />
      )}
      <div className='modal-body'>
        {showClose && (
          <span className='btn-close' onClick={onCloseClick}>
            X
          </span>
        )}
        <h4 className='modal-title'>{title}</h4>
        {message ? <p className='modal-text'>{message}</p> : props.children}
      </div>
    </div>
  )
}

Modal.defaultProps = {
  showClose: true,
  closeOnBackdropClick: true
}

export { Modal }
