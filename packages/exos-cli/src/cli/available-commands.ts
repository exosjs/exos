import path from "path";
import fs from "fs";

// Obtain all available commands paths by reading all folder names
const scriptsFolder = path.resolve(__dirname, "../commands");
const commandsFolders = fs.readdirSync(scriptsFolder).filter((item) => item && !item.startsWith("."));
const commandsPaths = commandsFolders.map((commandFolder) => path.resolve(scriptsFolder, commandFolder));

// Configure each command using the index.js file of each folder
const availableCommands = commandsPaths.map((commandPath) => {
  const command = require(commandPath).default;
  const commandName = commandPath.split("/")[commandPath.split("/").length - 1];

  return {
    ...command,
    name: commandName,
  };
});

export default availableCommands;
