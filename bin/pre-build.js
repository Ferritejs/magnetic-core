const path = require("path");
const dirs = require(`${__dirname}/../package.json`).directories;
const fs = require("fs");

fs.mkdirSync(dirs.base);

Object.keys(dirs).forEach((name) => {
  dirs[name] = path.normalize(dirs[name].replace(/\$base|\${base}/, dirs.base));
  if (name !== "base") {
    fs.mkdirSync(dirs[name]);
  }
});
