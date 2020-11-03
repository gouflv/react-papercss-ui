# rollup staffs

First, we will install dependencies:

```
yarn add --dev rollup /
rollup-plugin-typescript2 /
@rollup/plugin-commonjs /
@rollup/plugin-node-resolve /
rollup-plugin-peer-deps-external /
rollup-plugin-postcss
```



Then, place some configuration in `rollup.config.js`

```javascript
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'

const packageJson = require('./package.json')

export default {
  input: 'index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [peerDepsExternal(), resolve(), commonjs(), typescript(), postcss()]
}
```



We could run `rollup -c`  to let rollup start build this library, then you will be seeing  output files in `dist` folder:

```
# tree dist
├── components
│   ├── button
│   │   ├── Button.d.ts
│   │   ├── Button.stories.d.ts
│   │   └── __test__
│   │       └── Button.test.d.ts
│   └── space
│       └── Space.d.ts
├── index.d.ts
├── index.es.js
├── index.es.js.map
├── index.js
└── index.js.map

```



Oops, theme are some `stories.d.ts` `test.d.ts` files create by typescript. 

Luckily, we could ignore it by adding some  `exclude` path to the `tsconfig.json` :

```json
...
"exclude": [
  "node_modules",
  "dist",
  "components/**/*.stories.tsx",
  "components/**/*.test.tsx"
]
```

