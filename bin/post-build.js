const fs = require("fs/promises");
const path = require("path");
const fsex = require("fs-extra");

const PRG_PATH = path.join(__dirname, "..");
const OUT = path.join(
  PRG_PATH,
  require(path.join(PRG_PATH, "package.json")).directories.base,
);

(async () => {
  (await fs.readdir(OUT, { withFileTypes: true }))
    .filter((o) => o.isDirectory())
    .forEach((dir) => {
      fsex.copy(path.join(OUT, dir.name), path.join(PRG_PATH, dir.name));
    });
})();
