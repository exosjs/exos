import webpack from "webpack";
import webpackDevServer from "webpack-dev-server";
import getWebpackConfig from "../../common/getWebpackConfig";

const webpackConfig = getWebpackConfig();
console.info(webpackConfig.isCustom ? "Found custom webpack config" : "Using default webpack config");

// For more information, see https://webpack.js.org/api/node/
const compiler = webpack(webpackConfig.config);
const devServer = new webpackDevServer(compiler, webpackConfig.config.devServer);
const port = webpackConfig.config.devServer?.port || 8080;
const host = webpackConfig.config.devServer?.host || "0.0.0.0";

devServer.listen(port, host, (error?: Error) => {
  if (error) {
    console.error("❌ There was an error during start.");
    console.error(error);
    return;
  }
});
