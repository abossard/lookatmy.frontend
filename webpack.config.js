require('dotenv').config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRootPlugin = require('html-webpack-react-root-plugin');
const defaultExtensions = ['.ts', '.tsx', '.js'];
const webpack = require("webpack");


const {
    AD_CALLBACK_URL = "NO CALLBACK",
    AD_CLIENT_ID = "NO CLIENT ID",
    AD_TENANT = "NO TENANT",
    AD_RESOURCE = "NO RESOURCE"
} = process.env;

const appConfig = {
    target: 'web',
    entry: './src/app/index.tsx',
    devtool: "source-map",
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
        new webpack.DefinePlugin({
            __AD_CALLBACK_URL__: JSON.stringify(AD_CALLBACK_URL),
            __AD_CLIENT_ID__: JSON.stringify(AD_CLIENT_ID),
            __AD_TENANT__: JSON.stringify(AD_TENANT),
            __AD_RESOURCE__: JSON.stringify(AD_RESOURCE),
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'templates', 'default_index.ejs'),
            title: process.env.HTML_TITLE,
            favicon: './static/favicon.ico',
            hash: true
        }),
        new ReactRootPlugin()
    ]
};

module.exports = appConfig;
