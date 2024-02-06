const path = require("path");
const content = require(`${__dirname}/../package.json`);

// get directories which will be used for bundles
const dirs = content.directories ?? {
  base: "./dist",
  dev: "$base/dev",
  test: "$base/test",
  prod: "$base/prod",
  bundle: "$base/package",
};

dirs.base = path.normalize(path.resolve(path.join(__dirname, "..", dirs.base)));

Object.keys(dirs).forEach((key) => {
  if (key !== "base") {
    dirs[key] = dirs[key].replace(/\$base|\${base}/, dirs.base);
  }
});

module.exports = dirs;
