import { Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Space } from '../space/Space'
import { Button, ButtonProps } from './Button'

export default {
  title: 'Button',
  component: Button
}

const Template: Story<ButtonProps> = args => <Button {...args} />

export const Basic = Template.bind({})
Basic.args = { children: 'Button' } as ButtonProps

export const All = () => (
  <>
    <Button>Normal Button</Button>
    <Space />
    <Button type={'primary'}>Primary</Button>
    <Space />
    <Button type={'secondary'}>Secondary</Button>
    <Space />
    <Button size={'large'}>Large</Button>
    <Space />
    <Button block>Block</Button>
    <Space />
    <Button type={'danger'} plain>Plain</Button>
    <Space />
    <Button type={'primary'} disabled>Disabled</Button>
  </>
)
