import classNames from 'classnames'
import React, { FC } from 'react'

export interface ButtonProps {
  type?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'large' | 'small'
  plain?: boolean
  block?: boolean
  disabled?: boolean
  onClick?: () => void
}

const Button: FC<ButtonProps> = props => {
  const { type, size, plain, block, disabled, onClick } = props
  return (
    <button
      className={classNames('paper-btn', {
        [`btn-${type}${plain ? '-outline' : ''}`]: !!type,
        [`btn-${size}`]: !!size,
        'btn-block': block
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {props.children}
    </button>
  )
}

export { Button }
