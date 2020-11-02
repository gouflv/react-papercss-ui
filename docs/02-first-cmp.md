# Create First Component

The `react-papercss-ui` is base on PaperCSS. It had provides a set of css components  that we could integrate easily.

Let's start with:

```
yarn add papercss
```



Then, create our main style file and fill:

```scss
//# components/styles/index.scss

@import '~papercss/src/styles.scss';
```



Before create the component, we need some react dependencies:

```
yarn add react react-dom
yarn add --dev @types/react @types/react-dom
```



In order to reducing bundle size with Rollup, we will add an entry in `package.json`

```
...
"peerDependencies": {
  "react": ">=16.8.0",
  "react-dom": ">=16.8.0"
}
...
```



Now, we can create the first component `Button`

```tsx
//# components/button/Button.tsx

import classNames from 'classnames'
import React, { FC } from 'react'

export interface ButtonProps {
  type?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'large' | 'small'
  plain?: boolean
  block?: boolean
  disabled?: boolean
  onClick?: () => void
}

const Button: FC<ButtonProps> = props => {
  const { type, size, plain, block, disabled, onClick } = props
  return (
    <button
      className={classNames('paper-btn', {
        [`btn-${type}${plain ? '-outline' : ''}`]: !!type,
        [`btn-${size}`]: !!size,
        'btn-block': block
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {props.children}
    </button>
  )
}

export { Button }

```



Remainder to add export in the main entry point, it tall Rollup to bundled `Button` component and main style on build:

```typescript
//# index.ts
import './components/styles/index.scss'
export * from './components/button/Button'

```

