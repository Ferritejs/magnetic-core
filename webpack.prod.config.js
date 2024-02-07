const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { main, name, source } = require(path.join(__dirname, "package.json"));
const directories = require(path.join(__dirname, "bin", "dist-dirs"));

module.exports = {
  // target: "node",
  mode: "production",
  // devtool: "source-map",
  entry: {
    [name]: path.join(source.path, source.filename),
  },
  output: {
    path: directories.prod,
    filename: main.replace(".js", ".prod-bundle.js"),
  },
  optimization: {
    minimize: true,
    // mangleExports: false,
    // mangleWasmImports: false,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
          mangle: false,
          compress: true,
        },
      }),
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "~": path.resolve(__dirname, "src/"),
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
        compiler.hooks.afterEmit.tap("AfterEmitPlugin", () => {
          // post build script
        });
      },
    },
  ],
};
