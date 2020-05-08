const merge = require("webpack-merge"),
    common = require("./webpack.common.js");


module.exports = merge(common, {
    mode: "development",
    output: {
        publicPath: "../../static/frontend/"
    },
    devtool: "inline-source-map"
});
