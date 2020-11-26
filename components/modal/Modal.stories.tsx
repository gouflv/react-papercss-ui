import { Story } from '@storybook/react/types-6-0'
import React, { useState } from 'react'
import { Button } from '../button/Button'
import { Modal, ModalProps } from './Modal'

export default {
  title: 'Feedback/Modal',
  component: Modal
}

const Template: Story<ModalProps> = args => {
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open</Button>
      <Modal {...args} visible={visible} onClosed={() => setVisible(false)} />
    </div>
  )
}

export const Basic = Template.bind({})
Basic.args = {
  title: 'Modal Title',
  message: 'This is an example of modal'
}
