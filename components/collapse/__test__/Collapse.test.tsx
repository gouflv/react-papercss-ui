import { render, screen } from '@testing-library/react'
import React, { PropsWithChildren } from 'react'
import { Collapse, CollapseProps } from '../Collapse'

const { Panel } = Collapse

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
    expect(screen.getByText('Fist Panel')).toBeDefined()
  })

  it('should open un-name panel with active set as "1"', () => {
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
    const { container } = renderComponent()
    expect(container).toMatchSnapshot()
  })
})
