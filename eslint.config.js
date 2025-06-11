import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { includeIgnoreFile } from "@eslint/compat";
import baseConfig from "magic-eslint-config/base";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ignoreFile = includeIgnoreFile(join(__dirname, ".gitignore"));

/** @type {import('typescript-eslint').Config} */
export default [...baseConfig, { ignores: ignoreFile }];
