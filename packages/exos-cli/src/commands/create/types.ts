export enum Language {
  TYPESCRIPT = "Typescript",
  JAVASCRIPT = "JAVASCRIPT"
}

export enum EntityType {
  COMPONENT = "Component",
  CONTAINER = "Container",
  SERVICE = "Service"
}

export interface ICreateArguments {
  name: string;
  language: Language;
  type: EntityType;
}
