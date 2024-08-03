const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[name]__[local]___[hash:base64:5]"
                            }
                        }
                    }
                ],
                include: /\.module\.css/
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ],
                exclude: /\.module\.css/
            },
            {
                test: /\.html$/,
                use: ["html-loader"],
                exclude: /node_modules/
            },

        ]
    },
    devtool: 'source-map',
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            inject: "body",
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: [".jsx", ".js", ".ts", ".tsx"],
        preferRelative: true,
    },
    devServer: {
        historyApiFallback: true,
        port: 8080,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        client: {
          webSocketURL: {
            hostname: "localhost",
          },
        },
        allowedHosts: "all",
        devMiddleware: {
            writeToDisk: true,
        }
    },

}