export enum Languages {
  TypeScript = "ts",
  JavaScript = "js"
}

export enum EntityTypes {
  Component = "Component"
  // Container = "Container",
  // Service = "Service"
}

export interface ICreateArguments {
  name: string;
  language: Languages;
  type: EntityTypes;
}
