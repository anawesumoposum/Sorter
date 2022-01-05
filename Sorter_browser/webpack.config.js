const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    mode: 'development',
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "prod"),
        publicPath: "/prod/",
    },
    experiments: {
        syncWebAssembly: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                }
            },
            {
                test: /\.(tsx|ts)$/,
                loader: "ts-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                loader: 'file-loader',
            },
            {
                test: /\.wasm$/,
                type: "javascript/auto",
                use: {
                    loader: 'file-loader',
                    options: {
                        publicPath: "/prod/"
                    }
                }
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
    ],
}