import command from "./command";
import defaultValues from "./default-values";

export default {
  command: "init",
  describe: "Inits a new application scaffolding everything you need to start.",
  builder: defaultValues,
  handler: command,
};
