import yargsInteractive from "yargs-interactive";
import availableCommands from "./available-commands";
import getCliVersion from "./get-cli-version";
import getCommandOptions from "./get-command-options";
import chalk from "chalk";

const yargsConfig = yargsInteractive();

/*
 * This CLI has two levels:
 * 1) First, you need to choose the command to use.
 * 2) Then, you need to choose the options associated with that command (or sub-commands, if any).
 * Because the first part determines what to do next, we need to run yargs twice.
 */

// Configure all available commands in yargs and get all command names
// to provide interactive support for the first level (command selection)
availableCommands.forEach((command) => {
  const commandHandler = command.handler.bind(globalThis);
  const commandOptions = getCommandOptions(command.builder);

  // Replace handler with a new one that provides interactive support
  command.handler = (): unknown => {
    // Run yargsInteractive again to obtain the command options.
    // Use interactive mode is a property is missing.
    // Execute the command handler at the end.
    return yargsInteractive()
      .interactive(commandOptions as any)
      .then(commandHandler);
  };

  (yargsConfig as any).command(command);
});

export default function cli(): unknown {
  const cliVersion: string = getCliVersion();
  const command: string = process.argv[2];

  console.log();
  console.log(`Running ${chalk.white.bold("exos-cli")} command ${chalk.cyan(command)} (v${cliVersion})..`);
  console.log();

  // Run yargsInteractive for the first time to obtain the command to use
  return (yargsConfig as any)
    .usage("$0 <command> [args]")
    .demandCommand(1, 1, "You need to specify a command before moving on")
    .help()
    .wrap(null)
    .version(cliVersion).argv;
}
