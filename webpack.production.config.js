var Webpack = require('webpack');
var StatsPlugin = require('stats-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer-core');
var csswring = require('csswring');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var assetsPath = path.resolve(__dirname, 'public', 'assets');
var entryPath = path.resolve(__dirname, 'frontend', 'app.module.js');
var host = process.env.APP_HOST || 'localhost';

var config = {

    devtool: 'source-map',
    entry: entryPath,
    output: {
        path: assetsPath,
        filename: 'bundle.js',
        publicPath: '/assets/'
    },
    module: {

        loaders: [
            {test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: 'babel-loader'},
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css?sourceMap!postcss-loader?sourceMap')
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css?sourceMap!postcss-loader?sourceMap!less?sourceMap')
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }

        ]
    },
    postcss: [autoprefixer, csswring],

    plugins: [
        new ExtractTextPlugin("styles.css"),
        new Webpack.optimize.UglifyJsPlugin({minimize: true}),
        new StatsPlugin(path.join(__dirname, 'stats.json'), {chunkModules: true})
    ]
};

module.exports = config;