const fs = require("fs/promises");
const dirs = require("./dist-dirs");

if (dirs) {
  const { base, bundle } = dirs;
  (async () => {
    try {
      await fs.rm(base, { recursive: true, force: true });
      await fs.rm(bundle, { recursive: true, force: true });
    } catch (error) {
      console.log(error);
    }
  })();
}
