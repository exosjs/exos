import { execSync } from "child_process";

export default (isDevelopment: boolean): string => {
  if (process.env.VERSION) {
    return process.env.VERSION;
  }

  if (isDevelopment) {
    return "dev-version";
  }

  const gitVersion = execSync("git describe --always --tags");
  return gitVersion.toString().trim();
};
