import { Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Space } from '../space/Space'
import { Button, ButtonProps } from './Button'

export default {
  title: 'General/Button',
  component: Button
}

const Template: Story<ButtonProps> = args => <Button {...args} />

export const Basic = Template.bind({})
Basic.args = { children: 'Button' } as ButtonProps

export const All = () => (
  <>
    <Space>
      <Button>Normal Button</Button>
      <Button type={'primary'}>Primary</Button>
      <Button type={'secondary'}>Secondary</Button>
      <Button size={'large'}>Large</Button>
      <Button type={'danger'} plain>
        Plain
      </Button>
      <Button type={'primary'} disabled>
        Disabled
      </Button>
    </Space>
    <div style={{ width: '20em' }}>
      <Button block>Block</Button>
    </div>
  </>
)
