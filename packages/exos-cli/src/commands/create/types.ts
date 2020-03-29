export enum Languages {
  TypeScript = "ts",
  JavaScript = "js"
}

export enum EntityTypes {
  UIDomain = "UIDomain",
  Component = "Component",
  Service = "Service"
}

export interface ICreateArguments {
  name: string;
  language: Languages;
  type: EntityTypes;
}
