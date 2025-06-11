import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { includeIgnoreFile } from "@eslint/compat";
import nextConfig from "magic-eslint-config/next";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ignoreFile = includeIgnoreFile(join(__dirname, "/.gitignore"));

/** @type {import('typescript-eslint').Config} */
export default [...nextConfig, ignoreFile];
