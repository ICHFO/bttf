const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackWatchPlugin = require('webpack-watch-files-plugin').default

module.exports = {
    entry: './src/web/index.js',
    plugins: [
        new HtmlWebpackPlugin({
            title: "BTFF",
            template: "./src/web/index.html"
        }),
        new WebpackWatchPlugin({
            files: [
              './src/web/**/*js',
              './src/web/**/*css'
            ]
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                  "style-loader",
                  "css-loader"
                ]
            },
            {
                test: /.(png|svg|jpg|jpeg|gif)$/,
                loader: "file-loader"
            }
        ]
    },
    mode: "development"
}
