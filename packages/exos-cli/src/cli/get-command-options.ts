const defaultOptions = {
  interactive: { describe: "Use interactive mode", default: true },
};

interface CommandOption {
  default: unknown;
}

/**
 * Check current options and decide what to do.
 * If there is a missing property, run interactive mode
 * using the other properties as default values
 * @param commandOptions
 */
function getCommandOptions(commandOptions: CommandOption[]): unknown {
  const toReturn = Object.assign({}, defaultOptions, commandOptions);
  return toReturn;
}

export default getCommandOptions;
