import { useUpdateEffect } from 'ahooks'
import classNames from 'classnames'
import React, {
  FC,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useEffect,
  useState
} from 'react'
import { toArray } from '../../utils/children'

export type TabsProps = PropsWithChildren<{
  activeKey?: string | number
  onChange?: (value) => void
}>

const Tabs = (props: PropsWithChildren<TabsProps>) => {
  const [active, setActive] = useState<string>()

  useEffect(() => {
    if (!props.activeKey) return
    setActive(String(props.activeKey))
  }, [props.activeKey])

  function tabNavRender() {
    return toArray<ReactElement>(props.children).map((child, index) => {
      const key = String(child.props.value) || String(index)
      return (
        <label
          key={key}
          className={classNames({
            active: key === active
          })}
          onClick={() => setActive(key)}
        >
          {child.props.tab}
        </label>
      )
    })
  }

  function contentRender() {
    return toArray<ReactElement>(props.children).map((child, index) => {
      const key = String(child.props.value) || String(index)
      const isActive = active === key
      return React.cloneElement(child, {
        ...child.props,
        value: key,
        active: isActive
      } as TabPaneProps)
    })
  }

  useUpdateEffect(() => {
    if (typeof props.onChange === 'function' && active !== props.activeKey) {
      props.onChange(active)
    }
  }, [active])

  return (
    <div className='tabs'>
      <div className='tabs-nav'>{tabNavRender()}</div>
      <div className='tabs-content'>{contentRender()}</div>
    </div>
  )
}

export interface TabPaneProps {
  tab: ReactNode
  value?: number | string
  active?: boolean
}

const TabPane: FC<TabPaneProps> = props => {
  return (
    <div
      className={classNames('content', {
        active: props.active
      })}
    >
      {props.children}
    </div>
  )
}

Tabs.TabPane = TabPane

export { Tabs }
