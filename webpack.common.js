const path = require("path"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    entry: "./frontend/src/index.js",
    output: {
        path: path.resolve(__dirname, "frontend/static/frontend"),
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js",
        crossOriginLoading: "anonymous"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
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
        new MiniCssExtractPlugin({
            filename: "[name].bundle.css",
            chunkFilename: "[name].chunk.css"
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "frontend/jinja2/frontend/index.html.j2"),
            filename: "../../jinja2/frontend/index.html",
            inject: "body"
        }),
        new HtmlWebpackPlugin({
            template: "./frontend/jinja2/frontend/index.html.j2",
        })
    ]
};
