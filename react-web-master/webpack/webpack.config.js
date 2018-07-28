const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = require('../config');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
// 去除webpack编译警告
process.noDeprecation = true;

let webpackConfig = {
    entry: {
        index: [],
        commons: []
    },
    output: {
        path: path.join(__dirname, '/../public/'),
        filename: '[name]-[hash].js',
        chunkFilename: '[name]-[hash].js',
        publicPath: 'http://' + config.host + ':' + config.port + '/'
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            { test: /\.(png|jpg|gif|jpeg|svg)$/, use: 'url-loader?limit=8192' },
            { test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?modules' }) },
            { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"]},
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]" },
                    { loader: "less-loader" }
                ],
                include: [path.join(__dirname, '../node_modules/antd')]
            },
         
        ]
    },
    plugins: [
    ]
};

console.log('webpack env:', process.env.NODE_ENV);
webpackConfig.entry.commons.push('react', 'redux', 'react-redux');
webpackConfig.entry.index.push('babel-polyfill', path.join(__dirname, '/../client/index.js'));
webpackConfig.plugins.push(
    new CleanWebpackPlugin(
        ['public'],
        {
            root: path.join(__dirname, '/../'),
            verbose: true,
            dry: false
        }
    ),
    new LodashModuleReplacementPlugin,
    new HtmlWebpackPlugin({
        template: path.join(__dirname, '/../client/index.html'),
        filename: path.join(__dirname, '/../public/index.html'),
        chunks: ['commons', 'index']
    }),
    new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({
        backend_url: JSON.stringify(config.client.backend_url)
    })
);

if (process.env.NODE_ENV === 'development') {
    webpackConfig.devtool = 'inline-source-map';
} else {
    webpackConfig.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}
module.exports = webpackConfig;