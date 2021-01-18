const ManifestPlugin = require("webpack-manifest-plugin");
const nodeExternals = require("webpack-node-externals");

exports.chainWebpack = webpackConfig => {
  if (!process.env.SSR) {
    webpackConfig.devServer.disableHostCheck(true);
    return;
  }
  webpackConfig
    .entry("app")
    .clear()
    .add("./src/main.server.js");

  webpackConfig.target("node");
  webpackConfig.output.libraryTarget("commonjs2");
  webpackConfig
    .plugin("manifest")
    .use(new ManifestPlugin({ fileName: "ssr-manifest.json" }));

  webpackConfig.externals(nodeExternals({ allowlist: /\.(css|vue)$/ }));

  webpackConfig.optimization.splitChunks(false).minimize(false);
}