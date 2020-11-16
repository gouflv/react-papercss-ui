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
import { isArrayEqual } from '../../utils/array'
import { toArray } from '../../utils/children'

export type CollapseProps = PropsWithChildren<{
  activeKey?: string | string[] | number | number[]
  accordion?: boolean
  onChange?: (activeKey) => void
}>

const Collapse = (props: PropsWithChildren<CollapseProps>) => {
  const [active, setActive] = useState<string[]>([])

  useEffect(() => {
    if (typeof props.activeKey === 'undefined') return
    if (Array.isArray(props.activeKey)) {
      setActive((props.activeKey as any[]).map(k => String(k)))
    } else {
      setActive([String(props.activeKey)])
    }
  }, [props.activeKey])

  function childRender() {
    return toArray<ReactElement>(props.children).map((child, index) => {
      const key = child.props.name || String(index)
      const isActive = !!~active.indexOf(key)
      return React.cloneElement(child, {
        ...child.props,
        key,
        name: child.props.name || key,
        active: isActive,
        onClick: onPanelClick
      } as PanelProps)
    })
  }

  function onPanelClick(key: string | number) {
    const _active = String(key)
    if (props.accordion) {
      setActive(!!~active.indexOf(_active) ? [] : [String(key)])
    } else {
      setActive(prevState => {
        const keySet = new Set(prevState)
        keySet.has(_active) ? keySet.delete(_active) : keySet.add(_active)
        return Array.from(keySet)
      })
    }
  }

  useUpdateEffect(() => {
    if (typeof props.onChange !== 'function') return
    if (props.accordion) {
      if (active !== props.activeKey) {
        props.onChange(active)
      }
    } else {
      if (
        !isArrayEqual(
          active,
          Array.isArray(props.activeKey) ? props.activeKey : [props.activeKey]
        )
      ) {
        props.onChange(active)
      }
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
    if (props.onClick && props.name) {
      props.onClick(props.name)
    }
  }

  return (
    <div
      className={classNames('collapsible', {
        'collapsible--active': props.active
      })}
      data-name={props.name}
    >
      <label onClick={onClick}>{props.header}</label>
      <div className='collapsible-body'>{props.children}</div>
    </div>
  )
}

Collapse.Panel = Panel

export { Collapse }
