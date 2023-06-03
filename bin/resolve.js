const path = require("path");
const dirs = require("../package.json").directories;
const process = require("process");

const keys = {};

Object.keys(dirs).forEach((name) => {
  keys[name] = true;
  dirs[name] = path.normalize(dirs[name].replace(/\$base|\${base}/, dirs.base));
});

const name = process.argv[2];
keys[name] && console.log(dirs[name]);
