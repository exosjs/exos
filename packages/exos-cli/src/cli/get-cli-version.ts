import path from "path";
import fs from "fs-extra";

function getCliVersion(): string {
  const packageJsonPath = path.resolve(__dirname, "../../package.json");
  const packageJson = fs.readJsonSync(packageJsonPath);
  return packageJson.version;
}

export default getCliVersion;
