const path = require("path")
const webpack = require("webpack")

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // mode: "production",
    // devtool: "source-map",
    mode,
    entry: {
        application: "./app/javascript/application.js"
    },
    output: {
        filename: "[name].js",
        sourceMapFilename: "[file].map",
        path: path.resolve(__dirname, "app/assets/builds"),
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
        new MiniCssExtractPlugin({
            filename: "[name]-webpack.css"
        })
    ],
    module: {
        rules: [{
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            // add fonts/iamges/svg rule
            {
                test: /\.(png|jpe?g|gif|eot|woff2|woff|ttf|svg)$/i,
                use: 'file-loader',
            },
            // Add CSS/SASS/SCSS rule with loaders
            {
                test: /\.(?:sa|sc|c)ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ]
    }
}
