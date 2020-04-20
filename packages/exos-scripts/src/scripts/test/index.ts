#!/usr/bin/env node

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "test";
}

import jest from "jest";
import getConfigToUse from "../../common/getConfigToUse";
import jestConfig = require("./jest.config");
import type { Config } from "@jest/types";

// Get config path (default or custom)
const configToUse = getConfigToUse<Config.Argv>("test.js", jestConfig as any);
console.info(configToUse.isCustom ? `Found custom test config at ${configToUse.customConfigPath}` : "Using default test config");

// Get a copy of the current arguments, and set the config to use
const argv = process.argv.slice();
argv.push("--config", JSON.stringify(configToUse.config));

// Run Jest with the arguments
jest.run(argv);
