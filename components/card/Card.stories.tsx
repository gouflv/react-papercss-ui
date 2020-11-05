import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Button } from '../button/Button'
import { Card, CardProps } from './Card'

const { CardBody } = Card

export default {
  title: 'Card',
  component: Card,
  subcomponents: {
    CardBody
  }
} as Meta

const Template: Story<CardProps> = args => (
  <Card {...args} style={{ width: '20em' }} />
)

export const Basic = Template.bind({})

const defaultBody = (
  <CardBody title={'Awesome Card!'} desc={'yeah~'}>
    <Button>Button addition</Button>
  </CardBody>
)

Basic.args = { header: 'Header', children: defaultBody } as CardProps

export const Covered = Template.bind({})
const Cover = <img src='https://placeimg.com/300/400/animals' alt='' />
Covered.args = { children: defaultBody, cover: Cover } as CardProps
