import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import * as React from 'react'
import { PropsWithChildren } from 'react'
import { Tabs, TabsProps } from '../Tabs'

const { TabPane } = Tabs

describe('Test Panel Component', () => {
  let props: PropsWithChildren<TabsProps>

  beforeEach(() => {
    props = {
      children: [
        <TabPane key='1' tab='First Tab' value='1'>
          First Tab Content
        </TabPane>,
        <TabPane key='2' tab='Second Tab' value='2'>
          Second Tab Content
        </TabPane>
      ]
    }
  })

  const renderComponent = () => render(<Tabs {...props} />)

  it('should open panel without active setting', () => {
    const { container } = renderComponent()
    expect(container).toMatchSnapshot()
    expect(container.querySelector('.active')).toBeNull()
  })

  it('should open panel with active set as "2"', () => {
    props = {
      ...props,
      activeKey: '2'
    }
    const { container } = renderComponent()
    expect(container).toMatchSnapshot()

    const tabsNav = screen.getByText('Second Tab')
    expect(tabsNav).toHaveClass('active')

    const tabsContent = screen.getByText('Second Tab Content')
    expect(tabsContent).toHaveClass('active')
  })

  it('should emit active key on click tab-nav', () => {
    const onChange = jest.fn()
    props = {
      ...props,
      activeKey: '1',
      onChange
    }
    const cmp = renderComponent()
    fireEvent.click(cmp.getByText('Second Tab'))
    expect(onChange).toBeCalledWith('2')
    expect(onChange).toBeCalledTimes(1)
  })

  it('should open un-name panel with active set as number', () => {
    props = {
      activeKey: 1,
      children: [
        <TabPane key='1' tab='First Tab'>
          First Tab Content
        </TabPane>,
        <TabPane key='2' tab='Second Tab'>
          Second Tab Content
        </TabPane>
      ]
    }

    const { container } = renderComponent()
    expect(container).toMatchSnapshot()
    const tabsNav = screen.getByText('Second Tab')
    expect(tabsNav).toHaveClass('active')

    const tabsContent = screen.getByText('Second Tab Content')
    expect(tabsContent).toHaveClass('active')
  })
})
