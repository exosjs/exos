# Exos Scripts ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![npm version](https://img.shields.io/npm/v/exos-scripts.svg?style=flat)](https://www.npmjs.com/package/exos-scripts)

This project contains a set of out-of-the-box extensible scripts that helps you with the lifecycle of your React + TypeScript applications. It is _heavily_ inspired in [Facebook' Create React App](https://github.com/facebookincubator/create-react-app) plugin.

It contains the following built-in features:

- `exos-scripts start`: A ready-to-be-used development experience as similar to production as it could be.
- `exos-scripts build`: A build script for web applications, configured and optimized to provide the best performance.
- `exos-scripts test`: A unit testing framework ([Jest](https://jestjs.io/)) already configured for you.
  - `CI=true exos-scripts test`: Also comes with coverage configured that will be executed by default in CI environments. You can trigger it this way or by running `exos-scripts test --collectCoverage`.
- `exos-scripts lint`: a static analyzer tool configured with the best practices for development with [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/).
  - `exos-scripts lint --type=Library`: Also comes with a flavor for Node Libraries using [TypeScript](https://www.typescriptlang.org/), [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/).

> **Note:** For more information about the **🛡️Exos** initiative, click [here](https://github.com/nanovazquez/exos).

## Getting started

To use it in your projects, first install `exos-scripts` in your package by running:

```bash
npm i -D exos-scripts
```

Then, update your **package.json** with the following:

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
