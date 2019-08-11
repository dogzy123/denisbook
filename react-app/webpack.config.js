const path                  = require('path');
const webpack               = require('webpack');

const { CleanWebpackPlugin }    = require('clean-webpack-plugin');
const TerserPlugin              = require('terser-webpack-plugin');
const HtmlWebPackPlugin         = require("html-webpack-plugin");
const MiniCssExtractPlugin      = require('mini-css-extract-plugin');

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
                test : /\.css$/,
                use : {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../dist',
                        hmr: process.env.NODE_ENV === 'development',
                    },
                },
            },
            {
                test: /\.(less)$/,
                use : [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            },
        ]
    },

    optimization : {
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                extractComments: true
            }),
        ],
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}`
        },
        namedModules: true,
        splitChunks : {
            chunks: 'async',
            minChunks: 2,
            minSize: 0,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            name: true,
            cacheGroups: {
                vendors : {
                    test : /[\\/]node_modules[\\/]/,
                    priority : -10,
                    name : module => {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        return `vendor.${packageName.replace('@', '')}`;
                    },
                    chunks : 'all'
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
        new webpack.HashedModuleIdsPlugin(),
        new CleanWebpackPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

        new webpack.ProvidePlugin({
            "React": "react",
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV' : JSON.stringify('production')
        }),

        new MiniCssExtractPlugin({
            filename: process.env.NODE_ENV === 'production' ? '../dist/style/main-[hash].css' : '../src/style/main.css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),

        new HtmlWebPackPlugin({
            template: "../views/index.html",
            filename: "../../feed/index.html",
            chunks: ['feed']
        }),

        new HtmlWebPackPlugin({
            template: "../views/pm/index.html",
            filename: "../../pm/index.html",
            chunks: ['pm']
        })
    ]
};