const fs = require("fs");
const fsp = require("fs/promises");
const dirs = require(`${__dirname}/dist-dirs`);

const targetDir = process.argv[2];


(async () => {

  if (targetDir && fs.existsSync(targetDir) && fs.statSync(targetDir).isDirectory()) {
    await fsp.rm(targetDir, { recursive: true, force: true });
  }

  dirs && Object.values(dirs).forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  });
})();
