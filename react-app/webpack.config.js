const path                  = require('path');
const CleanWebpackPlugin    = require('clean-webpack-plugin');
const webpack               = require('webpack');
/*const HtmlWebPackPlugin = require("html-webpack-plugin");*/

module.exports = {

    entry: {
        feed : "./src/feed/index.js",
        pm : "./src/pm/index.js"
    },

    output: {
        path: path.resolve(__dirname, "./dist"),

        filename: "[name]-bundle.js"
    },

    resolve : {
        alias : {
            '@material-ui/core' : '@material-ui/core/es'
        }
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
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

    optimization : {
        splitChunks : {
            cacheGroups: {
                vendors : {
                    test : /[\\/]node_modules[\\/]/,
                    name : 'vendor',
                    chunks : 'all'
                }
            }
        }
    },

    plugins: [
        new webpack.ProvidePlugin({
            "React": "react",
        }),

        new CleanWebpackPlugin(),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV' : JSON.stringify('production')
        }),

        // TODO
        /*new HtmlWebPackPlugin({
            template: "../views/index.html",
            filename: "../index.html",
        })*/
    ]
};