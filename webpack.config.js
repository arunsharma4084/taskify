const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.join(__dirname, "public", "dist"),
        filename: "bundle.js",
    },
    mode: 'development',
    devtool: "eval-cheap-module-source-map",
    devServer: {
        static: {
            directory: path.join(__dirname, 'public')
        },
        port: 9000,
        compress: true,
        open: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node-modules/,
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.(svg|png|jpg)?$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "images"
                    }
                }    
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader',
                ]
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html',
        favicon: "./public/images/favicon.png",
        publicPath: "/"
    }),
        new CleanWebpackPlugin(),
        new Dotenv({
            path: path.resolve(__dirname, ".env.local"),
            ignoreStub: true
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
}