const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { main, name, source } = require(path.join(__dirname, "package.json"));
const directories = require(path.join(__dirname, "bin", "dist-dirs"));

module.exports = {
  target: "node",
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    [name]: path.join(source.path, source.filename),
  },
  output: {
    path: directories.dev,
    filename: main.replace(".js", ".dev-bundle.js"),
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
        compiler.hooks.afterEmit.tap("AfterEmitPlugin", () => {
          // post build script
        });
      },
    },
  ],
};
