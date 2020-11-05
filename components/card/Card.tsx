import React, { CSSProperties, FC, PropsWithChildren, ReactNode } from 'react'

export interface CardProps {
  header?: string
  footer?: string
  cover?: ReactNode
  style?: CSSProperties
}

export interface CardBodyProps {
  title?: string | ReactNode
  desc?: string | ReactNode
}

const Card = (props: PropsWithChildren<CardProps>) => {
  return (
    <div className={'card'} style={props.style}>
      {!!props.header && <div className='card-header'>{props.header}</div>}
      {!!props.cover && props.cover}
      {props.children}
      {!!props.footer && <div className='card-footer'>{props.footer}</div>}
    </div>
  )
}

const CardBody: FC<CardBodyProps> = props => (
  <div className='card-body'>
    <div className='card-title'>{props.title}</div>
    <div className='card-text'>{props.desc}</div>
    {props.children}
  </div>
)

Card.CardBody = CardBody

export { Card, CardBody }
