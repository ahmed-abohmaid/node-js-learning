import { fileURLToPath } from "node:url";

export const getViewPath = (viewFileName) =>
  fileURLToPath(new URL(`../views/${viewFileName}`, import.meta.url));
