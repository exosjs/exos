export enum AppTypes {
  ReactUIApp = "React UI app",
  Library = "Library"
}

export interface ICreateArguments {
  name: string;
  type: AppTypes;
}
