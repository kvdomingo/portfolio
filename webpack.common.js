const path = require("path"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    dotenv = require("dotenv"),
    webpack = require("webpack");


const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

module.exports = {
    entry: "./frontend/src/index.js",
    output: {
        path: path.resolve(__dirname, "frontend/static/frontend"),
        filename: "main.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            { test: /\.(woff|woff2)$/, loader: "url-loader" },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?mimetype=application/octet-stream"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                issuer: {
                    test: /\.jsx$/
                },
                use: ["babel-loader", "@svgr/webpack", "url-loader"]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader"
            },
            {
                test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            },
            {
                test: /\.gif(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin(envKeys),
        new HtmlWebpackPlugin({
            template: "./frontend/public/index.html",
        })
    ]
};
