const defaultValues = {
  type: {
    type: "list",
    choices: ["Component", "Container", "Service"],
    default: undefined,
    describe: "Entity type",
    // demandOption: true,
    validate: value => !!value
  },
  name: {
    type: "input",
    default: undefined,
    describe: "Entity name",
    // demandOption: true,
    validate: value => !!value
  }
};

export default defaultValues;
