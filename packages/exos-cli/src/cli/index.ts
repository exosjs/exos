import yargsInteractive from "yargs-interactive";
import availableCommands from "./available-commands";
import getCliVersion from "./get-cli-version";
import getCommandOptions from "./get-command-options";

const yargsConfig = yargsInteractive();

/*
 * This CLI has two levels:
 * 1) First, you need to choose the command to use.
 * 2) Then, you need to choose the options associated with that command (or sub-commands, if any).
 * Because the first part determines what to do next, we need to run yargs twice.
 */

// Configure all available commands in yargs and get all command names
// to provide interactive support for the first level (command selection)
availableCommands.forEach(command => {
  const commandHandler = command.handler.bind(this);
  const commandOptions = getCommandOptions(command.builder);

  // Replace handler with a new one that provides interactive support
  command.handler = () => {
    // Run yargsInteractive again to obtain the command options.
    // Use interactive mode is a property is missing.
    // Execute the command handler at the end.
    return yargsInteractive()
      .interactive(commandOptions)
      .then(commandHandler);
  };

  yargsConfig.command(command);
});

export default function initCli() {
  // Run yargsInteractive for the first time to obtain the command to use.
  return yargsConfig
    .usage("$0 <command> [args]")
    .demandCommand(1, 1, "You need to specify a command before moving on")
    .help()
    .wrap(null)
    .version(getCliVersion()).argv;
}
