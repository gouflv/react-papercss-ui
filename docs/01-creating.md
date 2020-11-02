# Creating library

First, we start from an empty folder named `react-papercss-ui` or your liking:

```
mkdir react-papercss-ui
cd react-papercss-ui
```



Second, initial `package.json`  `.editorconfig` manal or running the command:

```
npm init
...
ec init
...
```



We chose `prettier` to format code, so running `yarn add prettier --dev` to install it, and configure via `.prettierrc` 

```json
//.prettierrc
{
  "singleQuote": true,
  "jsxSingleQuote": true,
  "semi": false,
  "tabWidth": 2,
  "arrowParens": "avoid",
  "trailingComma": "none"
}

```

>  You can set up to run prettier in the editor or npm script.



Next, initial typescript and configuration file

```
yarn add typescript --dev
...
yarn tsc --init
```



There are some key options of configuration:

```json
{
	compilerOptions: {
		"module": "esnext",
    "lib": ["dom", "esnext"],
    "jsx": "react",
    "declaration": true,
    "sourceMap": true,
    "strict": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
	},
	"include": ["index.ts","components"],
  "exclude": ["node_modules", "dist"]
}
```

> We plan to use index.ts as the main entry point and put all components in the `components` folder, so add there to `include` , and remember to create them.



Now, we had the skeleton of this library like:

```
components/
node_modules/
index.ts      
tsconfig.json
package.json
yarn.lock
```



You can also configure other tools like `lint-staged` `husky` `commitlint` to optimize the work flow.

