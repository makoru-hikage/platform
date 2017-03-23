/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2017-03-23
 */

const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlPlugin = require('html-webpack-plugin');

const extractStyles = new ExtractTextPlugin('[name].css');
const extractSvg = new ExtractTextPlugin('[name].svg');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        components: './components.js'
    },
    output: {
        path: './public/',
        filename: '[name].js',
        publicPath: '.',
        sourceMapFilename: '[name].js.map'
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.json$/,
                loaders: ['json-loader']
            },
            {
                test: /\.svg$/,
                loaders: extractSvg.extract({
                    fallback: 'file-loader?name=[name].[ext]&outputPath=./vectors/&publicPath=./vectors/',
                    use: ['svg-url-loader']
                })
            },
            {
                test: /\.png$/,
                loaders: ['file-loader?name=[name].[ext]&outputPath=./images/&publicPath=./images/']
            },
            {
                test: /\.(eot|svg|ttf|otf|woff2|woff)$/,
                loaders: ['file-loader?name=[name].[ext]&outputPath=./fonts/&publicPath=./fonts/']
            },
            {
                test: /\.css$/,
                loaders: extractStyles.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /^_.+\.s[ac]ss$/,
                loaders: ['sass-loader']
            },
            {
                test: /\.s[ac]ss$/,
                loaders: extractStyles.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.html$/,
                loaders: ['html-loader']
            }
        ]
    },
    resolve: {
        alias: {
            'bootstrap': 'bootstrap-sass'
        },
        extensions: ['.js', '.json', '.scss', '.sass', '.css'],
        mainFiles: ['index'],
        modules: ['node_modules']
    },
    plugins: [
        new HtmlPlugin({
            filename: 'index.html',
            template: './views/index.html'
        }),
        extractStyles,
        extractSvg
    ]
};

