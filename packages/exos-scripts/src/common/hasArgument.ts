/**
 * Checks if the collection of arguments has a specific argument
 * @param args The collection of arguments (e.g. `["--watchAll=true", "--coverage"]`)
 * @param arg The value to look for (e.g. `"--watchAll"`)
 * @returns True if any of the arguments starts with the value sent via parameters. False otherwise
 */
function hasArgument(args: string[], arg: string): boolean {
  return args.find((item) => item.startsWith(arg)) !== undefined;
}

export default hasArgument;
