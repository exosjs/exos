const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  entry: path.resolve(__dirname, "../src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.min.js",
    publicPath: "/"
  },

  devServer: {
    inline: true,
    hot: true,
    progress: true,
    contentBase: path.resolve(__dirname, "../dist")
  },

  // See https://webpack.js.org/configuration/devtool/
  devtool: "eval-cheap-module-source-map",

  resolve: {
    // Add resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //   react: "React",
  //   "react-dom": "ReactDOM"
  // },

  module: {
    rules: [
      // All .ts and .tsx files will be loaded with ts-loader
      { test: /\.ts(x?)$/, exclude: /node_modules/, use: [{ loader: "ts-loader" }] },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },

  plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname, "../public/index.html") })]
};
