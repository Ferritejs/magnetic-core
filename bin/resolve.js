const process = require("process");
const dirs = require(`${__dirname}/dist-dirs`);

if (dirs) {
  const name = process.argv[2];
  const dir = dirs[name];
  if (!dir) {
    throw new Error(`dir ${name} not found`);
  }
  console.log(dirs[name]);
}
