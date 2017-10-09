require('dotenv').config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRootPlugin = require('html-webpack-react-root-plugin');
const defaultExtensions = ['.ts', '.tsx', '.js'];
const webpack = require("webpack");

const requiredEnvVars = [
    "AD_CALLBACK_URL",
    "AD_CLIENT_ID",
    "AD_TENANT",
    "AD_RESOURCE",
    "API_SOLUTIONS_URL",
    "API_SUBSCRIPTION_KEY",
];

const envVars = requiredEnvVars.reduce(function(result, name) {
    return Object.assign(result, {[name]: process.env[name] || false})
}, {});

const missingVars = Object.keys(envVars).filter(function(name){return envVars[name]===false});
if(missingVars.length > 0) {
    console.log("Missing environment variables: " + missingVars);
    process.exit(1);
}

const defines = Object.keys(envVars).reduce(function(result, name){
    return Object.assign(result, {["__"+name+"__"]: JSON.stringify(envVars[name])});
}, {});

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
        new webpack.DefinePlugin(defines),
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
