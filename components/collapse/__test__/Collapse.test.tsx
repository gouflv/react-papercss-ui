import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import React, { PropsWithChildren } from 'react'
import { Collapse, CollapseProps } from '../Collapse'

const { Panel } = Collapse

const ACTIVE_CLASS_NAME = 'collapsible--active'

describe('Test Collapse Component', () => {
  let props: PropsWithChildren<CollapseProps>

  beforeEach(() => {
    props = {
      children: [
        <Panel key='1' name='1' header='Fist'>
          Fist Panel
        </Panel>,
        <Panel key='2' name='2' header='Second'>
          Second Panel
        </Panel>,
        <Panel key='3' name='3' header='Third'>
          Third Panel
        </Panel>
      ]
    }
  })

  const renderComponent = () => render(<Collapse {...props} />)

  it('should open panel with active set as "1"', () => {
    props = {
      ...props,
      activeKey: '1'
    }
    const { container } = renderComponent()
    expect(container).toMatchSnapshot()
    expect(
      container.querySelector(
        `.${ACTIVE_CLASS_NAME}[data-name="${props.activeKey}"]`
      )
    ).not.toBeNull()
  })

  it('should open panels with active set as ["1", "2"]', () => {
    props = {
      ...props,
      activeKey: ['1', '2']
    }
    const { container } = renderComponent()
    expect(container).toMatchSnapshot()
    expect(container.querySelectorAll(`.${ACTIVE_CLASS_NAME}`).length).toBe(2)
  })

  it('should all panel closed without active props', () => {
    const { container } = renderComponent()
    expect(container.querySelector(`.${ACTIVE_CLASS_NAME}`)).toBeNull()
  })

  it('should open un-name panel with active set as number', () => {
    props = {
      activeKey: 0,
      children: [
        <Panel key='1' header='Fist'>
          Fist Panel
        </Panel>,
        <Panel key='2' header='Second'>
          Second Panel
        </Panel>
      ]
    }
    let container = renderComponent().container
    expect(container).toMatchSnapshot()
    expect(
      container
        .querySelectorAll(`.collapsible`)[0]
        .classList.contains(ACTIVE_CLASS_NAME)
    ).toBeTruthy()

    props.activeKey = 1
    container = renderComponent().container
    expect(
      container
        .querySelectorAll(`.collapsible`)[1]
        .classList.contains(ACTIVE_CLASS_NAME)
    ).toBeTruthy()
  })

  it('should emit multi active keys on click', () => {
    const onChange = jest.fn()
    props = {
      ...props,
      activeKey: '1',
      onChange
    }
    const cmp = renderComponent()
    fireEvent.click(cmp.getByText('Third'))
    expect(onChange).toBeCalledWith(['1', '3'])
    expect(onChange).toBeCalledTimes(1)
  })

  it('should emit multi active keys on click un-name panel', () => {
    const onChange = jest.fn()
    props = {
      activeKey: 0,
      children: [
        <Panel key='1' header='Fist'>
          Fist Panel
        </Panel>,
        <Panel key='2' header='Second'>
          Second Panel
        </Panel>
      ],
      onChange
    }
    const cmp = renderComponent()
    fireEvent.click(cmp.getByText('Second'))
    expect(cmp.container).toMatchSnapshot()
    expect(onChange).toBeCalledWith(['0', '1'])
  })
})
