const merge = require("webpack-merge"),
    common = require("./webpack.common.js"),
    CompressionPlugin = require("compression-webpack-plugin"),
    BundleTracker = require("webpack-bundle-tracker"),
    UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
    webpack = require("webpack");


module.exports = merge(common, {
    context: __dirname,
    mode: "production",
    output: {
        publicPath: "/static/frontend/bundles/"
    },
    plugins: [
        new BundleTracker({
            path: __dirname,
            filename: "webpack-stats.json"
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.SplitChunksPlugin({
            chunks: "async",
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                beautify: false,
                comments: false,
                comparisons: false,
                compress: true,
                conditionals: true,
                dead_code: true,
                evaluate: true,
                ie8: false,
                if_return: true,
                join_vars: true,
                keep_classnames: false,
                mangle: true,
                sequences: true,
                unused: true,
                warnings: false,
                output: {
                    comments: false,
                    beautify: false
                },
            },
            exclude: [/\.min\.js$/gi]
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
                level: 11
            },
            threshold: 10240,
            minRatio: 0.8,
        })
    ]
});
