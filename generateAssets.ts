import fg from "fast-glob";
import fs from "fs-extra";
import _ from "lodash";
import prettier from "prettier";

const PREFIX = "public/assets/images/";

const removeExtension = (filePath: string) => {
  const arr = filePath.split(".");
  arr.splice(arr.length - 1, 1);
  return arr.join(".");
};

(async () => {
  const rawEntries = await fg(`${PREFIX}**/*`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = {};
  for (const entry of rawEntries) {
    const filePath = entry.substr("public".length);
    const objPath = removeExtension(entry)
      .substr(PREFIX.length)
      .split("/")
      .map(_.camelCase)
      .map((v) => (v.match(/^[0-9](.*)/) ? `_${v}` : v));
    _.set(result, objPath, filePath);
  }
  const resultPath = "./src/constants/assets.ts";
  const configFile = await prettier.resolveConfigFile();
  await fs.writeFile(
    resultPath,
    prettier.format(
      `
    /**
    * THIS IS AUTOMATICALLY GENERATED USING /generateAssets.ts.
    * DON'T CHANGE IT MANUALLY.
    */

    export const assets = ${JSON.stringify(result)}
    `,
      {
        filepath: configFile ?? undefined,
      },
    ),
  );
})();
