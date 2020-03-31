import fs from "fs-extra";
import path from "path";
import { ICreateArguments, AppTypes } from "./types";

function getAllFiles(folderPath: string, fileNames: string[]) {
  fs.readdirSync(folderPath).forEach(fileName => {
    const filePath = path.resolve(folderPath, fileName);
    const fileStats = fs.lstatSync(filePath);

    // If it's a directory, do nothing
    if (fileStats.isDirectory()) {
      fileNames = getAllFiles(filePath, fileNames);
    } else {
      fileNames.push(filePath);
    }
  });

  return fileNames;
}

function createLibrary(namePascalCase: string, nameCamelCase: string, languagePrefix: string) {
  // Get the template files by entity type (i.e. all files inside the folder "templates/<entity-type>/<language-prefix>")
  // and copy these files into the output folder
  const templateFolder = path.resolve(__dirname, "templates", "library");
  const outputFolder = path.resolve(process.cwd(), namePascalCase);
  const nameSlugified = nameCamelCase.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);

  const files = getAllFiles(templateFolder, []);

  // Copy all files from the template folder to the output folder
  files.forEach(templateFilePath => {
    const fileName = templateFilePath.replace(`${templateFolder}/`, "");

    // Generate the output file path by replacing the "EntityName" placeholder in the fileName
    // with the entityFileName value, and add the language prefix
    const newFileName = fileName.replace(/EntityName/gi, namePascalCase).replace("template", languagePrefix);
    const outputFilePath = path.resolve(outputFolder, newFileName);

    // Retrieve template content and replace all "EntityName" placeholders with the entity name in either pascal case or slugified
    const templateFileContent = fs.readFileSync(templateFilePath, "utf8");
    const outputFileContent = templateFileContent.replace(/EntityName/g, namePascalCase).replace(/entityName/g, nameSlugified);

    // Create file in the output folder
    fs.ensureDirSync(path.dirname(outputFilePath));
    fs.writeFileSync(outputFilePath, outputFileContent);
  });
}

function createReactUIApp(namePascalCase: string, nameCamelCase: string, languagePrefix: string) {
  // TODO: implement
}

export default function command(argv: ICreateArguments) {
  const name = argv.name;
  const type = argv.type;

  const entityNamePascalCase = name[0].toUpperCase() + name.substring(1);
  const entityNameCamelCase = name[0].toLowerCase() + name.substring(1);
  const entityLanguagePrefix = "ts";

  console.log();
  console.log(`Creating ${type} named "${name}"..`);

  switch (AppTypes[type]) {
    case AppTypes.Library: {
      createLibrary(entityNamePascalCase, entityNameCamelCase, entityLanguagePrefix);
      break;
    }
    case AppTypes.ReactUIApp: {
      createReactUIApp(entityNamePascalCase, entityNameCamelCase, entityLanguagePrefix);
      break;
    }
  }

  console.log("Done!");
  console.log();
}
