import fs from "fs";
import path from "path";
import { CONFIG_PATH } from "./paths";

interface ConfigResult<T> {
  /** The configuration to use */
  config: T;
  /** True if the resolved webpack configuration is custom. False if it is the default */
  isCustom: boolean;
  /** The path of the custom configuration to use */
  customConfigPath?: string;
}

/**
 * Retrieves the configuration to use.
 * @param configFileName The config file name
 * @param defaultConfig The default config to use
 * @returns
 * If there is a custom configuration, we will call this file and send the default config.
 * Otherwise, we will simply return the default one.
 */
function getConfigToUse<T>(configFileName: string, defaultConfig: T): ConfigResult<T> {
  const customConfigPath: string = path.resolve(CONFIG_PATH, configFileName);
  const customConfigExists: boolean = fs.existsSync(customConfigPath);

  if (!customConfigExists) {
    return { config: defaultConfig, isCustom: false };
  }

  // We need to require this dynamically as the command is chosen by the user
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const config = require(customConfigPath)(defaultConfig, { env: process.env.NODE_ENV });
  return { config, isCustom: true, customConfigPath };
}

export default getConfigToUse;
