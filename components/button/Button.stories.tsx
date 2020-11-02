import { Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Button, ButtonProps } from './Button'

export default {
  title: 'Button',
  component: Button
}

const Template: Story<ButtonProps> = args => <Button {...args} />

export const Normal = Template.bind({})
Normal.args = { children: 'Normal' } as ButtonProps
