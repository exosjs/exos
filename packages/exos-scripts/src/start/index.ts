import webpack from "webpack";
import webpackDevServer from "webpack-dev-server";
import webpackConfig from "../webpack/webpack.config";

const compiler = webpack(webpackConfig);
const devServer = new webpackDevServer(compiler, webpackConfig.devServer);

devServer.listen(8000, "0.0.0.0", (error?: Error) => {
  if (error) {
    console.error("❌ There was an error during start.");
    console.error(error);
    return;
  }
});
