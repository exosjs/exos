# Exos CLI ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![npm version](https://img.shields.io/npm/v/exos-cli.svg?style=flat)](https://www.npmjs.com/package/exos-cli)

Exos CLI is a command line interface tool for React projects.

It supports the following modes:

1. **Fully interactive:** simply execute the command and you will be prompted to enter the command's parameters. Ideal to familiarize with the tool.
1. **Fully automated:** execute the command passing all the parameters and their values. Ideal for automation (and machines).
1. **Mixed mode:** You can pass by some parameters, you will be prompted for the missing ones.

> **Note:** For more information about the **🛡️Exos** initiative, click [here](https://github.com/nanovazquez/exos).

## Getting started

Execute Exos CLI by running:

```bash
npx exos-cli
```

You will visualize the **help** information of the CLI displaying the current commands. Each command can be executed directly by calling `npx exos-cli <command>`, and you will be prompted with the command parameters/options.

> **Pro tip!** Remember that you can also enter all the parameters when you run it. For example `npx exos-cli init --name=MyApp --type=ReactApp`.

### Available commands

#### 🐣 Init

Inits a new application scaffolding everything you need to start.

| Parameter | Description | Options                                                     |
| --------- | ----------- | ----------------------------------------------------------- |
| Name      | App name    | N/A                                                         |
| Type      | App type    | `ReactApp`, `Library`                                       |
| Author    | Author name | Defaults to your git user (`git config --global user.name`) |

Usage example: `npx exos-cli init --name=MyApp --type=ReactApp`

#### 🧩 Create

Creates a new entity of the specified type.

| Parameter | Description     | Options                           |
| --------- | --------------- | --------------------------------- |
| Name      | Entity name     | N/A                               |
| Type      | Entity type     | `UIDomain`, `Component`,`Service` |
| Language  | Language to use | `TypeScript`, `JavaScript`        |

Usage example: `npx exos-cli create --name=MyComponent --type=Component --language=TypeScript`
