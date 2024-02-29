const fs = require("fs/promises");
const path = require("path");
const packageContent = require(`${__dirname}/../package.json`);
const dirs = require(`${__dirname}/dist-dirs`);

const NEW_CONTENT = {
  scripts: {
    start: "node welcome.js",
  },
  source: undefined,
  devDependencies: undefined,
  husky: undefined,
  directories: undefined,
};

if (dirs) {
  // const PRG_PATH = path.join(__dirname, "..");
  const PKG_PATH = dirs.bundle;

  Object.assign(packageContent, NEW_CONTENT);

  (async () => {
    await fs.writeFile(
      path.join(PKG_PATH, "package.json"),
      JSON.stringify(packageContent, null, 2),
    );
  })();
}
