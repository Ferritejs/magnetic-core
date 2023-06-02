const fs = require("fs/promises");
const path = require("path");

const PRG_PATH = path.join(__dirname, "..");
const OUT = path.join(
  PRG_PATH,
  require(path.join(PRG_PATH, "package.json")).directories.base,
);

(async () => {
  try {
    const outDirStat = await fs.stat(OUT);
    if (outDirStat.isDirectory()) {
      (await fs.readdir(OUT, { withFileTypes: true }))
        .filter((o) => o.isDirectory())
        .forEach(async (dir) => {
          const p = path.join(PRG_PATH, dir.name);
          await fs.rm(p, { recursive: true, force: true });
        });
      await fs.rm(OUT, { recursive: true, force: true });
    }
  } catch (_) {
    // EMPTY
  }
})();
