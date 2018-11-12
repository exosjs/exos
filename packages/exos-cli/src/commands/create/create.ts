import { ICreateArguments } from "./types";

export default function create(argv: ICreateArguments) {
  console.log("create command called with arguments", argv);
}
