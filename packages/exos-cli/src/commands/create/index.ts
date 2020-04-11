import command from "./command";
import defaultValues from "./default-values";

export default {
  command: "create",
  describe: "Creates a new entity of the specified type.",
  builder: defaultValues,
  handler: command,
};
