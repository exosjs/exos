## Exos-scripts

This project contains a set of out-of-the-box extensible scripts that helps you with the lifecycle of your React + TypeScript applications. It is inspired in [Facebook' Create React App](https://github.com/facebookincubator/create-react-app) plugin.

It contains the following built-in features:

- `exos-scripts start`: A ready-to-be-used development experience as similar to production as it could be.
- `exos-scripts build`: A build script for web applications, configured and optimized to provide the best performance.
- `exos-scripts test`: A unit testing framework and coverage already configured for you ([Jest](https://jestjs.io/)).
- `exos-scriptsn lint`: a static analyzer tool configured with the best practices for development with [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/).
  - `exos-scriptsn lint --type=Library`: Also comes with a flavor for Node Libraries using [TypeScript](https://www.typescriptlang.org/), [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/).

## How to use it

Install exos scripts in your package by running:

```bash
npm i -D exos-scripts
```

Then, update your package.json with the following:

```json
{
  "name": "Your App",
  "version": "0.0.1",
  ...
  "scripts": {
    "lint": "exos-scripts lint",
    "test": "exos-scripts test",
    "start": "exos-scripts start",
    "build": "exos-scripts build"
  },
}
```

🚀!
