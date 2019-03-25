# Exos CLI ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![npm version](https://img.shields.io/npm/v/exos-cli.svg?style=flat)](https://www.npmjs.com/package/exos-cli)

Exos CLI is a command line interface tool for React projects.

It supports the following modes:

1. **Fully interactive:** simply execute the command and you will be prompted to enter the command's options. Ideal to familiarize with the tool.
1. **Fully automated:** execute the command passing all the parameters and their values. Ideal for automation (and machines).
1. **Mixed mode:** You can pass by some arguments and you will be prompted for the missing ones.

> **Pro tip:** use the `--help` option to visualize all commands and their options.

## Getting started

Execute Exos CLI by running:

```
npx exos-cli
```

You will visualize the **help** information of the CLI displaying the current commands.

## Components

### Create commant

Creates a new entity of the specified type.

| Parameter | Description     | Options                    |
| --------- | --------------- | -------------------------- |
| Name      | Entity name     | N/A                        |
| Type      | Entity type     | `Component`                |
| Language  | Language to use | `TypeScript`, `JavaScript` |

Usage:

**Fully interactive:**

```
npx exos-cli create
```

**Fully automated:**

```
npx exos-cli create --name="ProductList" --type="Component" --language="TypeScript"
```

**Mixed mode:**

```
npx exos-cli create --name="ProductList"
```
