import webpack from "webpack";
import webpackConfig from "../webpack/webpack.config";

// For more information, see https://webpack.js.org/api/node/
const compiler = webpack(webpackConfig);

compiler.run((err: Error, stats: webpack.Stats) => {
  // The err object will only contain webpack-related issues, such as misconfiguration, etc.
  // Compilation errors are stored in stats.hasErrors()
  if (err) {
    console.error(err.message);
    console.error(err.stack || err);
    return;
  }

  const executionStats = stats.toJson({ all: false, warnings: true, errors: true });

  if (executionStats.errors.length) {
    // Only keep the first error. Others are often indicative
    // of the same problem, but confuse the reader with noise.
    console.error("❌ There was an error during build.");
    console.error(executionStats.errors[0]);
    return;
  }

  if (stats.hasWarnings()) {
    console.warn("🚧 There were warnings during build.");
    console.warn(executionStats.warnings);
    return;
  }

  console.info("✅ Build completed successfully.");
});
