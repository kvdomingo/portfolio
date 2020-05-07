const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");


module.exports = {
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader"},
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[name]__[local]__[hash:base64:5]",
                            },
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: () => [
                                autoprefixer({})
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|ttf|eot|otf)$/,
                loader: "file-loader"
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                loader: "file-loader?limit=10000&name=img/[name].[ext]"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./frontend/public/index.html",
            filename: "index.html",
            inject: "body"
        })
    ],
    devServer: {
        contentBase: "./frontend/src",
        compress: true
    }
};
