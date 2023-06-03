const fs = require("fs/promises");
const path = require("path");
const dirs = require("../package.json").directories;

Object.keys(dirs).forEach((name) => {
  dirs[name] = path.normalize(dirs[name].replace(/\$base|\${base}/, dirs.base));
});

const { base, bundle } = dirs;

const PKG_PATH = path.join(__dirname, "..", bundle);
const DIST_PATH = path.join(__dirname, "..", base);

(async () => {
  try {
    await fs.rm(PKG_PATH, { recursive: true, force: true });
    await fs.rm(DIST_PATH, { recursive: true, force: true });
  } catch (error) {
    console.log(error);
  }
})();
