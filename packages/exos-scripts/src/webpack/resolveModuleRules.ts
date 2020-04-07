import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { SOURCE_PATH } from "./paths";
import type webpack from "webpack";

export default (isDevelopment: boolean): webpack.RuleSetRule[] => [
  // All .ts and .tsx files will be loaded with ts-loader
  { test: /\.ts(x?)$/, include: SOURCE_PATH, use: [{ loader: "ts-loader" }] },
  // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
  { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
  {
    test: /\.scss$/,
    use: [
      isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          importLoaders: 1,
          modules: {
            mode: "local",
            localIdentName: "[name]__[local]--[hash:base64:5]",
            context: SOURCE_PATH,
          },
        },
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
        },
      },
    ],
  },
  { test: /\.svg$/, use: ["@svgr/webpack", "url-loader"] },
];
