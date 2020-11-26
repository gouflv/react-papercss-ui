import { Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Tabs, TabsProps } from './Tabs'

const { TabPane } = Tabs

export default {
  title: 'Data Display/Tabs',
  component: Tabs
}

const Template: Story<TabsProps> = args => <Tabs {...args} />

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam beatae commodi enim labore neque officia suscipit velit vero. Assumenda, consequuntur, cupiditate. A, animi beatae dolorem ducimus et exercitationem iste quidem.'

const BasicPanels = [
  <TabPane key='1' tab='Fist Panel' value='1'>
    <header>A.</header> {LOREM}
  </TabPane>,
  <TabPane key='2' tab='Second Panel' value='2'>
    <header>B.</header> {LOREM}
  </TabPane>,
  <TabPane key='3' tab='Third Panel' value='3'>
    <header>C.</header> {LOREM}
  </TabPane>
]

export const Basic = Template.bind({})
Basic.args = { activeKey: '1', children: BasicPanels } as TabsProps

export const IndexBase = Template.bind({})
IndexBase.args = {
  activeKey: 1,
  children: [
    <TabPane key='1' tab='Fist Panel'>
      <header>A.</header> {LOREM}
    </TabPane>,
    <TabPane key='2' tab='Second Panel'>
      <header>B.</header> {LOREM}
    </TabPane>
  ]
}
