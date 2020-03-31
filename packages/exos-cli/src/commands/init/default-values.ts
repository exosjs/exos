import child_process from "child_process";
import { AppTypes } from "./types";

const gitUserName = child_process
  .execSync("git config --global user.name")
  .toString()
  .trim();
const gitUserEmail = child_process
  .execSync("git config --global user.email")
  .toString()
  .trim();
const authorName = gitUserName + (gitUserEmail && ` <${gitUserEmail}>`);

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
  },
  authorName: {
    type: "input",
    default: authorName,
    describe: "Author"
  }
};

export default defaultValues;
