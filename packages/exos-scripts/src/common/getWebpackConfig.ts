import fs from "fs";
import path from "path";
import webpackConfig from "../webpack/webpack.config";
import { CONFIG_PATH } from "./paths";
import type webpack from "webpack";

interface WebpackConfigResult {
  /** The webpack configuration to use */
  config: webpack.Configuration;
  /** True if the resolved webpack configuration is custom. False if it is the default */
  isCustom: boolean;
}

/**
 * Retrieves the webpack configuration to use.
 * If there is a custom webpack configuration, we will call this file and send the default webpack config.
 * Otherwise, we will simply return the default one.
 */
function getWebpackConfig(): WebpackConfigResult {
  const customConfigPath: string = path.resolve(CONFIG_PATH, "webpack.js");
  const customConfigExists: boolean = fs.existsSync(customConfigPath);

  if (!customConfigExists) {
    return { config: webpackConfig, isCustom: false };
  }

  const config = require(customConfigPath)(webpackConfig, { env: process.env.NODE_ENV });
  return { config, isCustom: true };
}

export default getWebpackConfig;
