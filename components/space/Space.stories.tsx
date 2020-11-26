import { Story } from '@storybook/react/types-6-0'
import React, { FC } from 'react'
import { Space } from './Space'

const Box: FC = props => (
  <span
    style={{
      display: 'block',
      padding: '0.5rem',
      backgroundColor: '#ccc'
    }}
  >
    {props.children}
  </span>
)

export default {
  title: 'General/Space',
  component: Space
}

const Template: Story = args => <Space {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: [<Box>Link1</Box>, <Box>Link2</Box>, <Box>Link3</Box>]
}
