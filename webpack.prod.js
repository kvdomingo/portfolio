const merge = require("webpack-merge"),
    common = require("./webpack.common.js"),
    CompressionPlugin = require("compression-webpack-plugin"),
    zlib = require("zlib");


module.exports = merge(common, {
    mode: "production",
    plugins: [
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
