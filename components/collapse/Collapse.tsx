import React, {
  FC,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useEffect,
  useState
} from 'react'
import { toArray } from '../../utils/children'

export type CollapseProps = PropsWithChildren<{
  activeKey?: string | string[] | number | number[]
  accordion?: boolean
  onChange?: (activeKey) => void
}>

const Collapse = (props: PropsWithChildren<CollapseProps>) => {
  const [active, setActive] = useState<string[]>([])

  useEffect(() => {
    if (!props.activeKey) return
    if (Array.isArray(props.activeKey)) {
      setActive((props.activeKey as any[]).map(k => String(k)))
    } else {
      setActive([String(props.activeKey)])
    }
  }, [props.activeKey])

  function childRender() {
    return toArray<ReactElement>(props.children).map((child, index) => {
      const key = String(child.props.name) || String(index)
      const isActive = !!~active.indexOf(key)
      return React.cloneElement(child, {
        ...child.props,
        key,
        active: isActive,
        onClick: onPanelClick
      } as PanelProps)
    })
  }

  function onPanelClick(key: string | number) {
    if (props.accordion) {
      setActive([String(key)])
    } else {
      setActive(prevState => {
        const keySet = new Set(prevState)
        keySet.add(String(key))
        return Array.from(keySet)
      })
    }
  }

  useEffect(() => {
    if (typeof props.onChange === 'function') {
      props.onChange(active)
    }
  }, [active])

  return <div className='collapse-group'>{childRender()}</div>
}

export interface PanelProps {
  name?: number | string
  header: ReactNode
  active?: boolean
  onClick?: (key: string | number) => void
}

const Panel: FC<PanelProps> = props => {
  function onClick() {
    if (props.onClick && props.name && !props.active) {
      props.onClick(props.name)
    }
  }

  return (
    <div className='collapsible'>
      <label onClick={onClick}>{props.header}</label>
      {!!props.active && (
        <div
          className='collapsible-body'
          style={{ maxHeight: 'none', padding: '0.75rem', opacity: 1 }}
        >
          {props.children}
        </div>
      )}
    </div>
  )
}

Collapse.Panel = Panel

export { Collapse }
