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
    console.log();
    console.error(chalk.red("❌ There are compilation errors. Fix them and try again."));
    console.error(err.message);
    console.error(err.stack || err);
    console.log();
    process.exit(1);
  }

  const executionStats = stats.toJson({ all: false, warnings: true, errors: true });

  if (executionStats.errors.length) {
    // Only print the first error. Others are often indicative
    // of the same problem, and the extra noise will confuse the reader.
    console.log();
    console.error(chalk.red("❌ There was an error during build."));
    console.error(executionStats.errors[0]);

    // Exit with a failure code
    process.exit(1);
  }

  if (stats.hasWarnings()) {
    // Print all the warnings, but don't fail
    console.log();
    console.warn(chalk.yellow("🚧 There were warnings during build."));
    executionStats.warnings.forEach((warning) => console.warn(chalk.yellow(warning)));

    // Exit with an OK code
    process.exit(0);
  }

  console.info(chalk.green("✅ Build completed successfully."));
});
