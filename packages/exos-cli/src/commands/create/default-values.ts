import { EntityType, Language } from "./types";

const defaultValues = {
  type: {
    type: "list",
    choices: Object.keys(EntityType),
    default: EntityType.COMPONENT,
    describe: "Entity type"
  },
  name: {
    type: "input",
    default: undefined,
    describe: "Entity name",
    validate: value => !!value
  },
  language: {
    type: "list",
    choices: Object.keys(Language),
    default: Language.TYPESCRIPT,
    describe: "Language to use"
  }
};

export default defaultValues;
