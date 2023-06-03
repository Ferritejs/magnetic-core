const fs = require("fs/promises");
const path = require("path");
const fsExtra = require("fs-extra");
const cfg = require("../package.json");
const dirs = require("../package.json").directories;

Object.keys(dirs).forEach((name) => {
  dirs[name] = path.normalize(dirs[name].replace(/\$base|\${base}/, dirs.base));
});

const PRG_PATH = path.join(__dirname, "..");
const DIST_PATH = path.join(PRG_PATH, dirs.base);
const PKG_PATH = path.join(PRG_PATH, dirs.bundle);
const PKG_DIR = path.basename(PKG_PATH);

(async () => {
  (await fs.readdir(DIST_PATH, { withFileTypes: true })).forEach((obj) => {
    if (obj.name !== PKG_DIR) {
      fsExtra.copy(
        path.join(DIST_PATH, obj.name),
        path.join(PKG_PATH, obj.name),
      );
    }
  });
  await fs.writeFile(
    path.join(PKG_PATH, "package.json"),
    JSON.stringify(cfg, null, 2),
  );
})();
