const path              = require('path');
//const HtmlWebPackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, "./dist"),

        filename: "react-app-bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
            /*{
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }*/
        ]
    },
/*
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]*/
};