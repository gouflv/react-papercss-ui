import React, { ReactNode } from 'react'

export function toArray<T>(children: ReactNode) {
  return React.Children.toArray(children) as T[]
}
