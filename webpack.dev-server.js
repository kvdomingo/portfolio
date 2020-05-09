const path = require("path"),
    merge = require("webpack-merge"),
    common = require("./webpack.common.js");


module.exports = merge(common, {
    mode: "development",
    output: {
        // publicPath: "/"
    },
    devtool: "inline-source-map",
    devServer: {
        historyApiFallback: true,
        open: true,
        contentBase: path.resolve(__dirname, "frontend/static/frontend/js"),
        port: 3000,
        hot: true
    }
});
