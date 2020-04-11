import { EntityTypes, Languages } from "./types";

const defaultValues = {
  name: {
    type: "input",
    default: undefined,
    describe: "Entity name",
    validate: (value: string): boolean => !!value,
  },
  type: {
    type: "list",
    choices: Object.keys(EntityTypes),
    describe: "Entity type",
  },
  language: {
    type: "list",
    choices: Object.keys(Languages),
    describe: "Language to use",
  },
};

export default defaultValues;
