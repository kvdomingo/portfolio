const autoprefixer = require("autoprefixer"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin,
    BrotliPlugin = require('brotli-webpack-plugin');


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
        new BundleAnalyzerPlugin(),
        new BrotliPlugin({
            asset: "[path].br[query]",
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
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
