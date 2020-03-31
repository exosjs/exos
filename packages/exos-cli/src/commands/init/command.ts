import fs from "fs-extra";
import path from "path";
import { CommandArguments, AppTypes } from "./types";

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

function createApp(appType: string, authorName: string, namePascalCase: string, nameCamelCase: string, languagePrefix: string) {
  // Get the template files by entity type (i.e. all files inside the folder "templates/<entity-type>/<language-prefix>")
  // and copy these files into the output folder
  const templateFolder = path.resolve(__dirname, "templates", appType);
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

    // Retrieve template content and replace all placeholders with the respective values
    const templateFileContent = fs.readFileSync(templateFilePath, "utf8");
    const outputFileContent = templateFileContent
      .replace(/EntityName/g, namePascalCase)
      .replace(/entityName/g, nameSlugified)
      .replace(/AuthorName/g, authorName)
      .replace(/Year/g, new Date().getFullYear().toString());

    // Create file in the output folder
    fs.ensureDirSync(path.dirname(outputFilePath));
    fs.writeFileSync(outputFilePath, outputFileContent);
  });
}

export default function command(argv: CommandArguments) {
  const name = argv.name;
  const type = argv.type;
  const authorName = argv.authorName || "TBC";
  const entityNamePascalCase = name[0].toUpperCase() + name.substring(1);
  const entityNameCamelCase = name[0].toLowerCase() + name.substring(1);
  const entityLanguagePrefix = "ts";

  console.log();
  console.log(`Creating ${type} named "${name}"..`);

  createApp(AppTypes[type], authorName, entityNamePascalCase, entityNameCamelCase, entityLanguagePrefix);

  console.log("Done!");
  console.log();
}
