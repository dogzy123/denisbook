const path                  = require('path');
const webpack               = require('webpack');

const { CleanWebpackPlugin }    = require('clean-webpack-plugin');
const TerserPlugin          = require('terser-webpack-plugin');
const HtmlWebPackPlugin     = require("html-webpack-plugin");

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
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                extractComments: true
            }),
        ],
        splitChunks : {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            name: true,
            cacheGroups: {
                vendors : {
                    test : /[\\/]node_modules[\\/]/,
                    priority : -10,
                    name : 'vendor',
                    chunks : chunk => chunk.name !== "pre-main.min"
                },
                default : {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },

    plugins: [
        new CleanWebpackPlugin(),

        new webpack.ProvidePlugin({
            "React": "react",
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV' : JSON.stringify('production')
        }),

        new HtmlWebPackPlugin({
            template: "../views/index.html",
            filename: "./index.html",
            chunks: ['feed']
        }),

        new HtmlWebPackPlugin({
            template: "../views/pm/index.html",
            filename: "./pm.html",
            chunks: ['pm']
        })
    ]
};