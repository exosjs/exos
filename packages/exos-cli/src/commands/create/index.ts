import create from "./create";
import defaultValues from "./default-values";

const createCommand = {
  command: "create",
  describe: "Creates a new entity of the specified type.",
  builder: defaultValues,
  handler: create
};

export default createCommand;
