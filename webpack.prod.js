const path = require("path"),
  merge = require("webpack-merge"),
  common = require("./webpack.common.js"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  CompressionPlugin = require("compression-webpack-plugin"),
  BundleTracker = require("webpack-bundle-tracker"),
  webpack = require("webpack");

module.exports = merge(common, {
  context: __dirname,
  mode: "production",
  output: {
    path: path.resolve(__dirname, "frontend/static/frontend/bundles/"),
    publicPath: "/static/frontend/bundles/",
    filename: "[name].[contenthash:8].js",
    chunkFilename: "[name].[contenthash:8].chunk.js",
    crossOriginLoading: "anonymous",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[name].[contenthash:8].chunk.css",
    }),
    new BundleTracker({
      path: __dirname,
      filename: "webpack-stats.json",
    }),
    new webpack.optimize.SplitChunksPlugin({
      chunks: "async",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    }),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|css|html)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: "[path].br[query]",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        level: 11,
      },
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
});
