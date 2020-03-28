import fs from "fs-extra";
import path from "path";
import { ICreateArguments, Languages } from "./types";

export default function create(argv: ICreateArguments) {
  const entityType = argv.type;
  const entityNamePascalCase = argv.name[0].toUpperCase() + argv.name.substring(1);
  const entityNameCamelCase = argv.name[0].toLowerCase() + argv.name.substring(1);
  const entityLanguage = argv.language;
  const entityLanguagePrefix = Languages[argv.language];

  console.log();
  console.log(`Creating folder for ${entityType} "${entityNamePascalCase}" in language ${entityLanguage}..`);

  // Get the template folder by Entity Type
  const templateFolder = path.resolve(__dirname, "templates", entityType, entityLanguagePrefix);
  const outputFolder = path.resolve(process.cwd(), entityNamePascalCase);

  // Check if the output folder exists. If it does, abourt
  if (fs.pathExistsSync(outputFolder)) {
    console.error(`Folder "${outputFolder}" already exists. Remove the folder and try again. Aborting..`);
    console.log();
    return;
  }

  // Copy template folder to output folder
  fs.copySync(templateFolder, outputFolder, { recursive: true });

  // Rename output files: replace "EntityName" with the entity name in pascal case, and update its extension with the entity language prefix
  fs.readdirSync(outputFolder).forEach(file => {
    const newFileName = file.replace("EntityName", entityNamePascalCase).replace("template", entityLanguagePrefix);
    const oldPath = path.resolve(outputFolder, file);
    const newPath = path.resolve(outputFolder, newFileName);
    fs.renameSync(oldPath, newPath);
  });

  // Replace its content: replace "EntityName" placeholder with the entity name in camel case
  fs.readdirSync(outputFolder).forEach(file => {
    const filePath = path.resolve(outputFolder, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const output = fileContent.replace(/EntityName/g, entityNamePascalCase).replace(/entityName/g, entityNameCamelCase);
    fs.writeFileSync(filePath, output, "utf8");
  });

  console.log("Done!");
  console.log();
}
