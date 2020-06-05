#!/usr/bin/env node

import path from "path";
import { SOURCE_PATH } from "../../common/paths";
import getConfigToUse from "../../common/getConfigToUse";
import eslintrcReact = require("./.eslintrc.react");

// Use require because the ESLint types aren't updated yet.
const { ESLint } = require("eslint");
import eslintrcLibrary = require("./.eslintrc.library");

const isLibrary = process.argv.find((item) => item === "--type=library") !== null;
const eslintrc = isLibrary ? eslintrcLibrary : eslintrcReact;

// Resolve configuration to use
const configToUse = getConfigToUse<{}>("lint.js", eslintrc);
console.info(configToUse.isCustom ? `Found custom lint at ${configToUse.customConfigPath}` : "Using default lint config");

async function main() {
  try {
    const hasFix = process.argv.indexOf("--fix") !== -1;
    const filesFlagIndex = process.argv.indexOf("--files");
    const hasFiles = filesFlagIndex !== -1;
  
    // 1. Create an instance with the `fix` option.
    const eslint = new ESLint({
      baseConfig: configToUse.config,
      fix: hasFix,
      useEslintrc: false,
    });
  
    let codeFolders: string[];

    codeFolders = [path.join(SOURCE_PATH, "/**/*.{ts,tsx}")];
    
    // 2. Lint files. This doesn't modify target files.
    const results = await eslint.lintFiles(codeFolders);
  
    // 3. If "--fix" is provided, modify the files with the fixed code.
    if (hasFix) {
      await ESLint.outputFixes(results);
    }
  
    // 4. Format the results.
    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);
  
    // 5. Output it.
    console.log(resultText);
  
    if (results.errorCount > 0 || results.warningCount > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
