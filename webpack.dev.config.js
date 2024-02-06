const path = require("path");
const exec = require("child_process").exec;
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { main, name } = require(path.join(__dirname, "package.json"));
const directories = require(path.join(__dirname, "bin", "dist-dirs"));

class File extends String {
  #name;
  #ext;
  constructor({ name, ext }) {
    super(`${name}.${ext}`);
    this.#name = name;
    this.#ext = ext;
  }
  get name() {
    return this.#name;
  }
  get ext() {
    return this.#ext;
  }
}
const outpath = directories.dev;
const outfile = new File({ name: `${name}.dev-bundle`, ext: "js" });
console.log(outpath);

const post_build = () => {
  const commands = [
    // `cp ${directories.base}/*.d.ts ${outpath}`,
    // `mv ${outpath}/index.d.ts ${outpath}/${outfile.name}.d.ts`,
  ];
  commands.forEach((cmd) => {
    exec(cmd, (err, stdout, stderr) => {
      if (stdout) process.stdout.write(stdout);
      if (stderr) process.stderr.write(stderr);
    });
  });
};

module.exports = {
  target: "node",
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    [name]: "./src/magnetic-core.ts",
  },
  output: {
    path: outpath,
    filename: `${outfile}`,
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.worker\.js$/,
        use: { loader: "worker-loader" },
      },
    ],
  },
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap("AfterEmitPlugin", post_build);
      },
    },
  ],
};
