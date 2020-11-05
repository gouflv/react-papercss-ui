import { Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Collapse, CollapseProps } from './Collapse'

const { Panel } = Collapse

export default {
  title: 'Data Display/Collapse',
  component: Collapse
}

const Template: Story<CollapseProps> = args => <Collapse {...args} />

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam beatae commodi enim labore neque officia suscipit velit vero. Assumenda, consequuntur, cupiditate. A, animi beatae dolorem ducimus et exercitationem iste quidem.'

const BasicPanels = [
  <Panel key='1' name='1' header='Fist Panel'>
    {LOREM}
  </Panel>,
  <Panel key='2' name='2' header='Second Panel'>
    {LOREM}
  </Panel>,
  <Panel key='3' name='3' header='Third Panel'>
    {LOREM}
  </Panel>
]

export const Basic = Template.bind({})
Basic.args = { activeKey: ['1', '3'], children: BasicPanels } as CollapseProps

export const Accordion = Template.bind({})
Accordion.args = { accordion: true, children: BasicPanels } as CollapseProps

export const Nesting = Template.bind({})
Nesting.args = {
  activeKey: '1',
  children: [
    <Panel key='1' name='1' header='Parent Panel'>
      <Collapse>{BasicPanels}</Collapse>
    </Panel>
  ]
}
