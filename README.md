Initialise Project

```
npm init --y
```

Add React

```
yarn add react react-dom
```

Add TypeScript

```
yarn add -D typescript @types/react @types/react-dom
```

Add `tsconfig.json` to root of the project and copy:

```
{
  "compilerOptions": {
    "target": "ES5" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */,
    "module": "ESNext" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */,
    "moduleResolution": "node" /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */ /* Type declaration files to be included in compilation. */,
    "lib": [
      "DOM",
      "ESNext"
    ] /* Specify library files to be included in the compilation. */,
    "jsx": "react-jsx" /* Specify JSX code generation: 'preserve', 'react-native', 'react' or 'react-jsx'. */,
    "noEmit": true /* Do not emit outputs. */,
    "isolatedModules": true /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */,
    "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */,
    "strict": true /* Enable all strict type-checking options. */,
    "skipLibCheck": true /* Skip type checking of declaration files. */,
    "forceConsistentCasingInFileNames": true /* Disallow inconsistently-cased references to the same file. */,
    "resolveJsonModule": true
    // "allowJs": true /* Allow javascript files to be compiled. Useful when migrating JS to TS */,
    // "checkJs": true /* Report errors in .js files. Works in tandem with allowJs. */,
  },
  "include": ["src/**/*"]
}

```

Add `App.tsx` file to `src` and include:

```
export const App = () => {
  return <h1>React TypeScript Webpack Starter Template</h1>
};

```

Add entrypoint `index.tsx` to `src` and include:

```
import ReactDOM from 'react-dom';
import { App } from './App';

ReactDOM.render(<App />, document.getElementById('root'));

```

Add Babel packages:

```
yarn add -D @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/plugin-transform-runtime
```

Add `.babelrc` file to root with:

```
{
  "presets": [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        "runtime": "automatic"
      }
    ],
    "@babel/preset-typescript"
  ]
}

```

Add Webpack packages:

```
yarn add -D webpack webpack-cli webpack-dev-server html-webpack-plugin
```

Add `babel-loader`

```
yarn add -D babel-loader
```

Add initial webpack config to `./webpack/webpack.config.js`:

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js',
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/index.html'),
    }),
  ],
}

```

Add `start` script to `package.json`:

```
{
  ...
  scripts: {
    ...
    "start": webpack serve --config webpack/webpack.config.js --open
  }
  ...
}
```

(For css support):

Add style loaders:

```
yarn add -D css-loader style-loader
```

In `webpack.config.js`:

```
module.exports = {
  ...
  module: {
    ...
    rules: [
      ...
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  }
}
```

(for image support)

Add declaration in declaration file (`./src/declarations.d.ts`) for image extension e.g. `png`:

```
declare module '*.png'
```

Add rule to `webpack.config.js`:

module.exports = {
...
module: {
...
rules: [
...
{
test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
type: 'asset/resource',
},
]
}
}

(For inline asset support)

Add declaration in declaration file for extension e.g. `svg`:

```
declare module '*.svg'
```

Add rule to `webpack.config.js`:

module.exports = {
...
module: {
...
rules: [
...
{
test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
type: 'asset/inline',
},
]
}
}

(For multiple environment support)

Rename `webpack.config.js` to `webpack.common.js`

Add `webpack.dev.js`, `webpack.production.js` and a new `webpack.config.js` files to `webpack` folder.

In `webpack.dev.js`:

```
module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
}

```

In `webpack.prod.js`:

```
module.exports = {
  mode: 'production',
  devtool: 'source-map',
}

```

Add `webpack-merge` package:

```
yarn add -D webpack-merge
```

In `webpack.config.js`:

```
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = (envVars) => {
  const { env } = envVars;
  const envConfig = require(`./webpack.${env}.js`);
  const config = merge(commonConfig, envConfig);
  return config;
};

```

In `package.json`, update `start` script and add `build` script:

```
...
scripts: {
  ...
  "start": "webpack serve --config webpack/webpack.config.js --env env=dev --open",
  "build": "webpack --config webpack/webpack.config.js --env env=prod --open",
}
```

(For linting support)

Add linting packages:

```
yarn add -D eslint eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-eslint-comments
```

Add `.eslintrc.js` to root:

```
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:eslint-comments/recommended',
    'prettier',
  ],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-var-requires': 'off',
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
}

```

Add lint script:

```
scripts: {
  ...
  "lint": "eslint --fix \"./src/**/*.{js,jsx,ts,tsx,json}\""
}
```

(For `prettier` support)

Add `prettier` packages:

```
yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
```

Add format script:

```
scripts: {
  ...
  "format": "prettier --write \"./src/**/*.{js,jsx,ts,tsx,json,css,scss,md}\""
}
```

(For Husky support)

Add husky packages:

```
yarn add -D husky@4 lint-staged
```

In `package.json` add:

```
...
"lint-staged": {
    "src/**/*.{js,jsx,ts,tsx,json}": [
      "eslint --fix"
    ],
    "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": [
      "prettier --write"
    ]
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  }
```

(For `await/async` support)

Add packages:

```
yarn add -D @babel/runtime @babel/plugin-transform-runtime
```

In `.babelrc` add:

```
...
"plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ]
  ]
```

(For copy webpack support)

Add `copy-webpack-plugin` package:

```
yarn add -D copy-webpack-plugin
```

In `webpack.common.js` add:

```
...
plugins: [
  ...
  new CopyPlugin({
      patterns: [
        { from: "source", to: "dest"}
      ]
    })
]
```

(For bundle analyzer)

Add package:

```
yarn add -D webpack-bundle-analyzer
```

In `webpack.prod.js` add:

```
...
plugins: [
  ...
  new BundleAnalyzerPlugin()
]
```