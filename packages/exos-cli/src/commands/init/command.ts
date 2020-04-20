import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import childProcess from "child_process";
import { AppTypes } from "./types";
import type { CommandArguments, AppTypeDependencies } from "./types";

function getAllFiles(folderPath: string, fileNames: string[]): string[] {
  fs.readdirSync(folderPath).forEach((fileName) => {
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

function createApp(appType: string, authorName: string, appFolder: string, namePascalCase: string, nameCamelCase: string, languagePrefix: string): void {
  // Get the template files by entity type (i.e. all files inside the folder "templates/<entity-type>/<language-prefix>")
  // and copy these files into the output folder
  const templateFolder = path.resolve(__dirname, "templates", appType);
  const outputFolder = path.resolve(process.cwd(), appFolder);
  const nameSlugified = nameCamelCase.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);

  console.log("Setting up initial files..");

  const files = getAllFiles(templateFolder, []);

  // Copy all files from the template folder to the output folder
  files.forEach((templateFilePath) => {
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

function installDependencies(appType: string, appFolderName: string): void {
  const appFolder = path.resolve(process.cwd(), appFolderName);

  const dependencies: AppTypeDependencies = {
    [AppTypes.Library]: {
      dependencies: [] as string[],
      devDependencies: ["@types/jest", "@types/node", "exos-scripts", "typescript"],
    },
    [AppTypes.ReactApp]: {
      dependencies: ["react", "react-dom"],
      devDependencies: ["@types/jest", "@types/react", "@types/react-dom", "exos-scripts", "typescript"],
    },
  };

  console.log("Installing dependencies..");

  const appTypeDependencies = (dependencies[appType].dependencies as string[]).join(" ");
  if (appTypeDependencies.length) {
    childProcess.execSync(`cd ${appFolder} && npm i ${appTypeDependencies}`, { stdio: "inherit" });
  }

  const appTypeDevDependencies = (dependencies[appType].devDependencies as string[]).join(" ");
  if (appTypeDevDependencies.length) {
    childProcess.execSync(`cd ${appFolder} && npm i -D ${appTypeDevDependencies}`, { stdio: "inherit" });
  }
}

export default function command(argv: CommandArguments): void {
  const name = argv.name;
  const type = argv.type;
  const authorName = argv.authorName || "TBC";
  const appFolder = name;
  const entityNamePascalCase = name[0].toUpperCase() + name.substring(1);
  const entityNameCamelCase = name[0].toLowerCase() + name.substring(1);
  const entityLanguagePrefix = "ts";

  console.log();
  console.log(`Creating ${type} named "${name}"..`);
  console.log();

  createApp(AppTypes[type], authorName, appFolder, entityNamePascalCase, entityNameCamelCase, entityLanguagePrefix);
  installDependencies(AppTypes[type], appFolder);

  console.log();
  console.log(chalk.green(`Success!`), `Created "${name}" at ${appFolder}`);
  console.log();

  console.log("Inside that directory, you can run several commands:");
  console.log();

  if (type == AppTypes.ReactApp) {
    console.log(chalk.cyan(`npm start`));
    console.log("  Starts the development server.");
    console.log();
  }

  console.log(chalk.cyan(`npm run build`));
  console.log(`${type == AppTypes.ReactApp ? "  Bundles the app  into static files for production." : "  Builds a library ready to be published"}`);
  console.log();

  console.log(chalk.cyan(`npm run test`));
  console.log("  Executes the test runner in all of your test files.");
  console.log();

  console.log(chalk.cyan(`npm run lint`));
  console.log("  Validates the code syntax in your files.");
  console.log();

  console.log("We suggest that you begin by typing:");
  console.log();
  console.log(chalk.cyan("  cd"), appFolder);
  console.log(`  ${chalk.cyan(`npm start`)}`);

  console.log();
  console.log("Happy hacking! 🚀");
  console.log();
}
