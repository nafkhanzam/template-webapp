import fg from "fast-glob";
import fs from "fs-extra";
import _ from "lodash";

const PREFIX = "public/assets/images/";

const removeExtension = (filePath: string) => {
  const arr = filePath.split(".");
  arr.splice(arr.length - 1, 1);
  return arr.join(".");
};

(async () => {
  const rawEntries = await fg(`${PREFIX}**/*`);
  const result: any = {};
  for (const entry of rawEntries) {
    const filePath = entry.substr("public".length);
    const objPath = removeExtension(entry)
      .substr(PREFIX.length)
      .split("/")
      .map(_.camelCase)
      .map((v) => (v.match(/^[0-9](.*)/) ? `_${v}` : v));
    _.set(result, objPath.join("."), filePath);
  }
  // console.log(`export const assets = ${JSON.stringify(result)}`);
  await fs.writeFile(
    "./src/constants/assets.ts",
    `export const assets = ${JSON.stringify(result)}`,
  );
})();
