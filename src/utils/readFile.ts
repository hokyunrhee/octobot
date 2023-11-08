import { readFileSync } from "fs"

export const readFile = (path: string) => {
  return readFileSync(path, { encoding: "utf8", flag: "r" })
}
