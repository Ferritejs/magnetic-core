#! /usr/bin/env node
const fs = require("fs");
const path = require("node:path");
const { execSync } = require("child_process");
// eslint-disable-next-line sonarjs/no-duplicate-string
const packageJson = require(path.join(__dirname, "..", "package.json"));

const PRJ_PATH = path.join(__dirname, "..");

// a random prefix is used in a temporary dir
const prefix = Array(20)
  .fill()
  .map(() => {
    const random = Math.round(Math.random() * 1000);
    const shift = random & 1 ? 0x41 : 0x61;
    const code = shift + (random % 26);
    return String.fromCharCode(code);
  })
  .join("");

const tmpDir = path.join(PRJ_PATH, prefix);

const commands = [packageJson.dependencies, packageJson.devDependencies]
  .map((obj, i) => [i ? "--save-dev" : "--save", obj])
  .filter((data) => typeof data[1] === "object" && Object.keys(data[1]))
  .map((data) => `npm install ${data[0]} ${Object.keys(data[1]).join(" ")}`);

const newPackageJson = JSON.parse(JSON.stringify(packageJson));
[newPackageJson.dependencies, newPackageJson.devDependencies] = [
  packageJson.dependencies,
  packageJson.devDependencies,
].map((obj) => (obj ? {} : undefined));

const tasks = [
  {
    log: () => `creating temporary dir: ${tmpDir}`,
    action: () => fs.mkdirSync(tmpDir),
  },
  {
    log: () => `moving node_modules into ${tmpDir}`,
    action: () =>
      fs.renameSync(
        path.join(PRJ_PATH, "node_modules"),
        path.join(tmpDir, "node_modules"),
      ),
  },
  {
    log: () => `copying package.json into ${tmpDir}`,
    action: () =>
      fs.copyFileSync(
        path.join(PRJ_PATH, "package.json"),
        path.join(tmpDir, "package.json"),
      ),
  },
  {
    log: () => `writing new package.json file`,
    action: () =>
      fs.writeFileSync(
        path.join(PRJ_PATH, "package.json"),
        JSON.stringify(newPackageJson, null, 2),
      ),
  },
  {
    log: () => `installing packages: \n\t${commands.join("\n\t")}`,
    action: () => commands.forEach((cmd) => execSync(cmd)),
    rollback: () => {
      try {
        fs.rmdirSync(fs.join(PRJ_PATH, "node_modules"));
      } catch (_) {
        //
      }
      console.log(
        `[ROLLBACK] moving node_modules from ${tmpDir} into ${PRJ_PATH}`,
      );
      fs.renameSync(
        path.join(tmpDir, "node_modules"),
        path.join(PRJ_PATH, "node_modules"),
      );
    },
  },
];

const terminal = [
  {
    log: () => `removing temporary dir ${tmpDir}`,
    action: () => fs.rmSync(tmpDir, { recursive: true, force: true }),
  },
];

[tasks, terminal].forEach((tasks) => {
  tasks.every((task, i, arr) => {
    console.log(`[${i + 1}/${arr.length}] ${task.log?.() ?? "unknown"}`);
    try {
      task.action();
    } catch (err) {
      console.error(err.toString());
      task.rollback?.();
      return false;
    }
    return true;
  });
});
