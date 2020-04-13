#!/usr/bin/env node

import path from "path";
import { CLIEngine } from "eslint";
import { SOURCE_PATH } from "../../common/paths";
import getConfigToUse from "../../common/getConfigToUse";
import eslintrcReact = require("./.eslintrc.react");
import eslintrcLibrary = require("./.eslintrc.library");

const isLibrary = process.argv.find((item) => item === "--type=library") !== null;
const eslintrc = isLibrary ? eslintrcLibrary : eslintrcReact;

// Resolve configuration to use
const configToUse = getConfigToUse<{}>("lint.js", eslintrc);
console.info(configToUse.isCustom ? `Found custom lint at ${configToUse.customConfigPath}` : "Using default lint config");

const cliEngine = new CLIEngine({
  configFile: configToUse.isCustom ? configToUse.customConfigPath : path.resolve(__dirname, `.eslintrc.${isLibrary ? "library" : "react"}.js`),
  fix: process.argv.indexOf("--fix") !== -1,
  useEslintrc: true,
});

const codeFolders = [path.join(SOURCE_PATH, "/**/*.ts")];
const report = cliEngine.executeOnFiles(codeFolders);

if (report.errorCount > 0 || report.warningCount > 0) {
  // Output to console and return failure signal
  const formatter = cliEngine.getFormatter();
  console.log(formatter(report.results));
  process.exit(1);
}
