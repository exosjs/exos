import path from "path";

const ROOT_PATH = path.resolve(process.cwd());
const CONFIG_PATH = path.resolve(ROOT_PATH, "config");
const SOURCE_PATH = path.resolve(ROOT_PATH, "src");
const ASSETS_PATH = path.resolve(ROOT_PATH, "public");
const OUTPUT_PATH = path.resolve(ROOT_PATH, "dist");
const OUTPUT_PUBLIC_PATH = "/";

export { ROOT_PATH, CONFIG_PATH, SOURCE_PATH, ASSETS_PATH, OUTPUT_PATH, OUTPUT_PUBLIC_PATH };
