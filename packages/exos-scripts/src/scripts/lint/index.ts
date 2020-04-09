#!/usr/bin/env node
import path from "path";
import { CLIEngine } from "eslint";
import { SOURCE_PATH } from "../../common/paths";
import getConfigToUse from "../../common/getConfigToUse";
import eslintrc = require("./.eslintrc");

// Resolve configuration to use
const configToUse = getConfigToUse<{}>("lint.js", eslintrc);
console.info(configToUse.isCustom ? `Found custom lint at ${configToUse.customConfigPath}` : "Using default lint config");

const cli = new CLIEngine({
  configFile: configToUse.isCustom ? configToUse.customConfigPath : path.resolve(__dirname, ".eslintrc.js"),
  fix: process.argv.indexOf("--fix") !== -1,
  useEslintrc: true,
});

const codeFolders = [SOURCE_PATH];
const report = cli.executeOnFiles(codeFolders);

if (report.errorCount > 0 || report.warningCount > 0) {
  // Output to console and return failure signal
  const formatter = cli.getFormatter();
  console.log(formatter(report.results));
  process.exit(1);
}
