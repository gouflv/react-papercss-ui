import classNames from 'classnames'
import React, { FC } from 'react'

export const Space: FC<{ size?: 'large' }> = ({ size, children }) => (
  <div
    className={classNames('space', {
      'space--large': size === 'large'
    })}
  >
    {children}
  </div>
)
