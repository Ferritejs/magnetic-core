const { mkdirSync } = require("fs");
const dirs = require(`${__dirname}/dist-dirs`);

dirs && Object.values(dirs).forEach((dir) => mkdirSync(dir));
