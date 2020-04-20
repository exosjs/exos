#!/usr/bin/env node

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "test";
}

import jest from "jest";
import getConfigToUse from "../../common/getConfigToUse";
import hasArgument from "../../common/hasArgument";
import jestConfig = require("./jest.config");
import type { Config } from "@jest/types";

// Get config path (default or custom)
const configToUse = getConfigToUse<Config.Argv>("test.js", jestConfig as any);
console.info(configToUse.isCustom ? `Found custom test config at ${configToUse.customConfigPath}` : "Using default test config");

const argv = process.argv.slice(2);
const isCI = !!process.env.CI;

// If the CI environment variable is set,
// run coverage (unless explicitly declared otherwise)
if (isCI && !hasArgument(argv, "--coverage")) {
  argv.push("--coverage");
}

// If it's no CI and we are not collecting coverage,
// run in watchAll mode (unless explicitly declared otherwise)
if (!isCI && !hasArgument(argv, "--coverage") && !hasArgument(argv, "--watchAl")) {
  argv.push("--watchAll");
}

// Run Jest with config and arguments
argv.push("--config", JSON.stringify(configToUse.config));
jest.run(argv);
