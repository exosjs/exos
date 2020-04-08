import webpack from "webpack";
import webpackDevServer from "webpack-dev-server";
import webpackConfig from "../../webpack/webpack.config";
import getConfigToUse from "../../common/getConfigToUse";

const configToUse = getConfigToUse<webpack.Configuration>("start.js", webpackConfig);
console.info(configToUse.isCustom ? `Found custom webpack config at ${configToUse.customConfigPath}` : "Using default webpack config");

// For more information, see https://webpack.js.org/api/node/
const compiler = webpack(configToUse.config);
const devServer = new webpackDevServer(compiler, configToUse.config.devServer);
const port = configToUse.config.devServer?.port || 8080;
const host = configToUse.config.devServer?.host || "0.0.0.0";

devServer.listen(port, host, (error?: Error) => {
  if (error) {
    console.error("❌ There was an error during start.");
    console.error(error);
    return;
  }
});
