const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
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
        new HtmlWebpackPlugin({
            inject: "body",
            template: './src/index.html'
        })
    ],
    resolve: {
        extensions: [".jsx", ".js", ".ts", ".tsx"]
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
    },

}