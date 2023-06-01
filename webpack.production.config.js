const path = require("path");
const exec = require("child_process").exec;
const { main, name, directories } = require("./package.json");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

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

const outpath = path.normalize(
  path.join(path.resolve(path.dirname(main), directories.prod)),
);
const outfile = new File({ name: `${name}.bundle`, ext: "js" });

const post_build = () => {
  const commands = [
    `cp ${__dirname}/${directories.out}/*.d.ts ${outpath}`,
    `mv ${outpath}/index.d.ts ${outpath}/${outfile.name}.d.ts`,
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
  mode: "production",
  entry: {
    [name]: "./src/magnetic-core.ts",
  },
  output: {
    path: outpath,
    filename: `${outfile}`,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
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
