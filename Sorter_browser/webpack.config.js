const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appConfig = {
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", "wasm"],
    },
    mode: 'development',//'production'
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
                //type: "javascript/auto",
                //type: "webassembly/experimental",
                mimetype: "application/wasm",
                use: 'wasm-loader',
                    //loader: 'file-loader',
                    //options: {
                        //publicPath: "/prod/"
                    //}
                
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
    ],
}

/*const workerConfig = {

}*/

module.exports = appConfig//, workerConfig]