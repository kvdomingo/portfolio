const path = require("path"),
    merge = require("webpack-merge"),
    common = require("./webpack.common.js");


module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        historyApiFallback: true,
        open: true,
        contentBase: path.join(__dirname, "frontend/src"),
        compress: true,
        port: 3000,
        hot: true
    }
});
