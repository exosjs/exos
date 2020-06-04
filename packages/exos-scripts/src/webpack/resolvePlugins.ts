import path from "path";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { ASSETS_PATH, OUTPUT_PATH, OUTPUT_PUBLIC_PATH } from "../common/paths";

export default (isDevelopment: boolean, version: string): webpack.Plugin[] => [
  new MiniCssExtractPlugin({
    filename: isDevelopment ? "styles.css" : "styles.[hash:5].css",
    chunkFilename: isDevelopment ? "[id].css" : "[id].[hash:5].css",
  }),
  new CopyWebpackPlugin([{ from: ASSETS_PATH, to: OUTPUT_PATH, ignore: ["index.ejs"] }]),
  new HtmlWebpackPlugin({
    cache: true,
    inject: "body",
    template: path.resolve(ASSETS_PATH, "index.ejs"),
    filename: path.resolve(OUTPUT_PATH, "index.html"),
    // Arbitrary options that are sent to the template file
    isDevelopment,
    publicPath: OUTPUT_PUBLIC_PATH,
    version,
  }),
  isDevelopment ? new webpack.HotModuleReplacementPlugin() : () => undefined,
];
