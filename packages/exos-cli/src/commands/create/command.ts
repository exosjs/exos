import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { CommandArguments, Languages, EntityTypes } from "./types";

function createEntity(
  entityType: string,
  folderName: string,
  entityFileName: string,
  entityNamePascalCase: string,
  entityNameCamelCase: string,
  entityLanguagePrefix: string
): void {
  console.log(`Creating ${entityType} named "${entityFileName}"`);

  // Get the template files by entity type (i.e. all files inside the folder "templates/<entity-type>/<language-prefix>")
  // and copy these files into the output folder
  const templateFolder = path.resolve(__dirname, "templates", entityType, entityLanguagePrefix);
  const outputFolder = path.resolve(process.cwd(), folderName);

  fs.readdirSync(templateFolder).forEach((fileName) => {
    // Get the template file path
    const templateFilePath = path.resolve(templateFolder, fileName);

    // Generate the output file path by replacing the "EntityName" placeholder in the fileName
    // with the entityFileName value, and add the language prefix
    const newFileName = fileName.replace(/EntityName/gi, entityFileName).replace("template", entityLanguagePrefix);
    const outputFilePath = path.resolve(outputFolder, newFileName);

    // Retrieve template content and replace all "EntityName" placeholders with the entity name in pascal case, or camel case
    const templateFileContent = fs.readFileSync(templateFilePath, "utf8");
    const outputFileContent = templateFileContent.replace(/EntityName/g, entityNamePascalCase).replace(/entityName/g, entityNameCamelCase);

    // If file exists, append the new content but add a new line first
    if (fs.existsSync(outputFilePath)) {
      fs.appendFileSync(outputFilePath, `\n${outputFileContent}`);
    } else {
      fs.writeFileSync(outputFilePath, outputFileContent);
    }
  });
}

/**
 * Check if the folder exists and creates it if it doesn't
 * @param folderName The folder name
 */
function createFolder(folderName: string): void {
  if (!fs.pathExistsSync(folderName)) {
    console.log(`Creating Folder named "${folderName}"`);
    fs.ensureDirSync(folderName);
  } else {
    console.log(`Folder with name "${folderName}" already exists.`);
  }
}

function createUiDomain(entityNamePascalCase: string, entityNameCamelCase: string, entityLanguagePrefix: string): void {
  // Create folder if it doesn't exist
  createFolder(entityNamePascalCase);

  // Create component
  createEntity(EntityTypes.Component, entityNamePascalCase, entityNamePascalCase, entityNamePascalCase, entityNameCamelCase, entityLanguagePrefix);

  // Create service
  createEntity(EntityTypes.Service, entityNamePascalCase, entityNameCamelCase, entityNamePascalCase, entityNameCamelCase, entityLanguagePrefix);
}

export default function command(argv: CommandArguments): void {
  const entityName = argv.name;
  const entityType = argv.type;
  const entityLanguage = argv.language;

  const entityNamePascalCase = entityName[0].toUpperCase() + entityName.substring(1);
  const entityNameCamelCase = entityName[0].toLowerCase() + entityName.substring(1);
  const entityLanguagePrefix = entityLanguage === Languages.TypeScript ? "ts" : "js";

  console.log();
  console.log(`Creating ${entityType} named "${entityName}"..`);

  switch (EntityTypes[entityType]) {
    case EntityTypes.UIDomain: {
      createUiDomain(entityNamePascalCase, entityNameCamelCase, entityLanguagePrefix);
      break;
    }
    default: {
      createEntity(EntityTypes.Component, entityNamePascalCase, entityNamePascalCase, entityNamePascalCase, entityNameCamelCase, entityLanguagePrefix);
      break;
    }
  }

  console.log();
  console.log(chalk.green(`Success!`), `Created "${entityName}".`);
  console.log();
}
