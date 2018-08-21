/**
 * webpack.prod.conf.js
 * created by sgb on 2018/08/21
 */
'use strict'
const path = require('path');
const { resolvePath, assetsPath, styleLoaders } = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const env = require('../config/prod.env');
//const CopyWebpackPlugin = require('copy-webpack-plugin')                      //webpack拷贝静态资源
const HtmlWebpackPlugin = require('html-webpack-plugin');                       //根据模版生成入口index.html
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');   //index.html注入js文件时标签属性
const MiniCssExtractPlugin = require('mini-css-extract-plugin');                //webpack4单独打包css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');  //css压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');                      //js压缩

//for NamedChunksPlugin
const seen = new Set()
const nameLength = 4

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    module: {
        rules: styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        path: config.build.assetsRoot,
        filename: assetsPath('js/[name].[chunkhash:8].js'),
        chunkFilename: assetsPath('js/[name].[chunkhash:8].js')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new MiniCssExtractPlugin({
            filename: assetsPath('css/[name].[contenthash:8].css'),
            chunkFilename: assetsPath('css/[name].[contenthash:8].css')
        }),
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: 'index.html',
            inject: true,
            favicon: resolvePath('favicon.ico'),
            title: 'webpack-cli',
            path: config.build.assetsPublicPath + config.build.assetsSubDirectory,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new ScriptExtHtmlWebpackPlugin({
            inline: /runtime\..*\.js$/
        }),
        new webpack.NamedChunksPlugin(chunk => {
            if (chunk.name) {
                return chunk.name
            }
            const modules = Array.from(chunk.modulesIterable)
            if (modules.length > 1) {
                const hash = require('hash-sum');
                const joinedHash = hash(modules.map(m => m.id).join('_'));
                let len = nameLength;
                while (seen.has(joinedHash.substr(0, len))) len++;
                seen.add(joinedHash.substr(0, len));
                return `chunk-${joinedHash.substr(0, len)}`;
            } else {
                return modules[0].id;
            }
        }),
        new webpack.HashedModuleIdsPlugin(),
        /*new CopyWebpackPlugin([
            {
                from: path.resolvePath(__dirname, '../static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ])*/
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial' // 只打包初始时依赖的第三方
                },
                commons: {
                    name: 'chunk-comomns',
                    test: resolvePath('src/components'), // 可自定义拓展你的规则
                    minChunks: 3, // 最小公用次数
                    priority: 5,
                    reuseExistingChunk: true
                }
            }
        },
        runtimeChunk: 'single',
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    mangle: {
                        safari10: true
                    }
                },
                sourceMap: config.build.productionSourceMap,
                cache: true,
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin()
        ]
    }
});

module.exports = webpackConfig;