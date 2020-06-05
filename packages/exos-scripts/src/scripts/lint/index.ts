#!/usr/bin/env node

import path from "path";
import { SOURCE_PATH } from "../../common/paths";
import getConfigToUse from "../../common/getConfigToUse";
import eslintrcReact = require("./.eslintrc.react");
import eslintrcLibrary = require("./.eslintrc.library");

// Use require because the ESLint types aren't updated yet.
const { ESLint } = require("eslint");

const isLibrary = process.argv.find((item) => item === "--type=library") !== null;
const eslintrc = isLibrary ? eslintrcLibrary : eslintrcReact;

// Resolve configuration to use
const configToUse = getConfigToUse<{}>("lint.js", eslintrc);
console.info(configToUse.isCustom ? `Found custom lint at ${configToUse.customConfigPath}` : "Using default lint config");

async function main() {
  const hasFixFlag = process.argv.indexOf("--fix") !== -1;

  // Create an instance with the `fix` option.
  const eslint = new ESLint({
    baseConfig: configToUse.config,
    fix: hasFixFlag,
    useEslintrc: false,
  });

  let codeFolders: string[];

  codeFolders = [path.join(SOURCE_PATH, "/**/*.{ts,tsx}")];

  try {
    // Lint files and get the lint result
    const results = await eslint.lintFiles(codeFolders);

    // If "--fix" is provided, modify the files with the fixed code
    if (hasFixFlag) {
      await ESLint.outputFixes(results);
    }

    // Format the results
    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);

    // Output the results and exit the process based on them
    const resultHasErrors = results.errorCount > 0;
    const resultHasWarnings = results.warningCount > 0;
    const exitCode = resultHasErrors || resultHasWarnings ? 1 : 0;

    console.log(resultText);
    process.exit(exitCode);
  } catch (error) {
    // eslint.lintFiles could throw errors
    // See https://eslint.org/docs/developer-guide/nodejs-api#%E2%97%86-new-eslint-options
    console.error(error);
    process.exit(1);
  }
}

main();
