#!/usr/bin/env node

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "prod";
}

import chalk from "chalk";
import webpack from "webpack";
import webpackConfig from "../../webpack/webpack.config";
import getConfigToUse from "../../common/getConfigToUse";

const configToUse = getConfigToUse<webpack.Configuration>("build.js", webpackConfig);
console.info(configToUse.isCustom ? `Found custom build config at ${configToUse.customConfigPath}` : "Using default build config");

// For more information, see https://webpack.js.org/api/node/
const compiler = webpack(configToUse.config);

compiler.run((err: Error, stats: webpack.Stats) => {
  // The err object will only contain webpack-related issues, such as misconfiguration, etc.
  // Compilation errors are stored in stats.hasErrors()
  if (err) {
    console.error(err.message);
    console.error(err.stack || err);
    console.log();
    process.exit(1);
  }

  const executionStats = stats.toJson({ all: false, warnings: true, errors: true });

  if (executionStats.errors.length) {
    // Only keep the first error. Others are often indicative
    // of the same problem, but confuse the reader with noise.
    console.error(chalk.red("❌ There was an error during build."));
    console.error(executionStats.errors[0]);
    console.log();
    process.exit(1);
  }

  if (stats.hasWarnings()) {
    console.warn(chalk.yellow("🚧 There were warnings during build."));
    console.warn(executionStats.warnings);
    console.log();
    process.exit(0);
  }

  console.info(chalk.green("✅ Build completed successfully."));
});
