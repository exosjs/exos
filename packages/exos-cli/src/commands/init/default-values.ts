import { AppTypes } from "./types";

const defaultValues = {
  name: {
    type: "input",
    default: undefined,
    describe: "App name",
    validate: (value: any) => !!value
  },
  type: {
    type: "list",
    choices: Object.keys(AppTypes),
    describe: "App type"
  }
};

export default defaultValues;
