/**
 * Created by dennis.zhao on 2017/4/22.
 */
const path = require("path");
const webpack = require("webpack");
const copyWebpackPlugin = require("copy-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {

    context: path.resolve(__dirname,"app"),
    devServer:{
        // colors: true,
        contentBase:path.join(__dirname,"appdist"),
        compress:true,
        port:3001
    },
    entry:{

        vendor:[
            "angular",
        ],
        logic:[
            "./entry.js",
        ],
        commoncss:[
            "./css/style.css",
        ]
    },
    output:{

        path:path.resolve(__dirname,"appdist"),
        filename:"[name].bundle.js"
    },
    module:{

        rules:[

            {
                test:/\.js$/,
                exclude:/(node_modules|bower_components)/,
                use:{
                    loader:"babel-loader"
                }
            },

            {
                test:/\.css$/,
                use:[
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test:/\.(png|jpg|gif|svg)$/,
                use:{
                    loader:"url-loader",
                    options:{
                        limit: 1000
                    }
                }
            },
            {
                test:/\.(woff|woff2|ttf|eot|ico)$/,
                use:{
                    loader:"file-loader"
                }
            }
        ]

    },

    plugins:[
        new webpack.optimize.UglifyJsPlugin(),
        new htmlWebpackPlugin({
            template:'./index.html',
        }),
        new copyWebpackPlugin([
            {
                from:"./img",
                to: path.resolve(__dirname,"appdist/img")
            }
        ])

    ]


}