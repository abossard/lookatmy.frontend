require("dotenv").config();
const path = require("path");
const defaultExtensions = [".ts", ".tsx", ".js"];
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRootPlugin = require("html-webpack-react-root-plugin");

const requiredEnvVars = [
    "AD_CALLBACK_URL",
    "AD_CLIENT_ID",
    "AD_TENANT",
    "AD_RESOURCE",
    "API_SOLUTIONS_URL",
    "API_SUBSCRIPTION_KEY",
    "HTML_TITLE",
];

const envVars = requiredEnvVars.reduce(function(result, name) {
    return Object.assign(result, {[name]: process.env[name] || false});
}, {});

const missingVars = Object.keys(envVars).filter(function(name) {
    return envVars[name] === false;
});
if (missingVars.length > 0) {
    process.stderr.write("Missing environment variables: " + missingVars);
    process.exit(1);
}

const defines = Object.keys(envVars).reduce(function(result, name) {
    return Object.assign(result, {["process.env." + name]: JSON.stringify(envVars[name])});
}, {});

const appConfig = {
    devtool: "source-map",
    entry: "./src/app/index.tsx",
    module: {
        rules: [
            {
                enforce: "pre",
                loader: "tslint-loader",
                options: {},
                test: /\.tsx?$/,
            },
            {
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                },
                test: /\.tsx?$/,
            },
        ],
    },
    output: {
        filename: "index.bundle.js",
        path: path.resolve(__dirname, "build", "htdocs"),
    },
    plugins: [
        new webpack.DefinePlugin(Object.assign({
            "process.env.PLATFORM": JSON.stringify("browser"),
        }, defines)),
        new HtmlWebpackPlugin({
            favicon: "./static/favicon.ico",
            hash: true,
            title: process.env.HTML_TITLE,
        }),
        new ReactRootPlugin(),
    ],
    resolve: {
        extensions: defaultExtensions,
    },
    target: "web",
};

module.exports = appConfig;
