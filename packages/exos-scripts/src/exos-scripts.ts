#! /usr/bin/env node
import path from "path";
import spawn from "cross-spawn";

function init(scriptName: string, availableScripts: string[], args: string[]) {
  const scriptToExecute = availableScripts.find((item) => item.indexOf(scriptName) !== -1);

  if (!scriptToExecute) {
    console.error(`Script ${scriptName} doesn't exist.`);
    console.error(`Valid scripts are: ${availableScripts.join(", ")}.`);
    console.log();
    return;
  }
  console.log(`Executing script ${scriptName}...`);
  const scriptPath = require.resolve(path.resolve(__dirname, "scripts", scriptToExecute));

  spawn.sync("node", [scriptPath, ...args], { stdio: "inherit" });
  console.log();
}

const availableScripts = ["build", "start", "lint", "test"];
const script = process.argv[2];
const otherArgs = process.argv.slice(3);

init(script, availableScripts, otherArgs);
