require('dotenv').config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRootPlugin = require('html-webpack-react-root-plugin');
const defaultExtensions = ['.ts', '.tsx', '.js'];

const appConfig = {
    target: 'web',
    entry: './src/app/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build', 'htdocs'),
        filename: 'index.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {}
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            }
        ]
    },
    resolve: {
        extensions: defaultExtensions
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: process.env.HTML_TITLE,
            favicon: './static/favicon.ico',
            hash: true
        }),
        new ReactRootPlugin()
    ]
};

module.exports = [appConfig];
