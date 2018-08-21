/**
 * webpack.dev.conf.js
 * created by sgb on 2018/08/21
 */
'use strict'
const path = require('path');
const { styleLoaders, createNotifierCallback, resolvePath } = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'); //友好终端输出、错误提示
const portfinder = require('portfinder');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    module: {
        rules: styleLoaders({
            sourceMap: config.dev.cssSourceMap,
            usePostCSS: true
        })
    },
    devtool: config.dev.devtool,
    // these devServer options should be customized in /config/index.js
    // 通过来自 webpack-dev-server 的这些选项，能够用多种方式改变其行为。
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: true,
        hot: true,
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay
            ? { warnings: false, errors: true }
            : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            favicon: resolvePath('favicon.ico'),
            title: 'webpack-cli',
            path: config.dev.assetsPublicPath + config.dev.assetsSubDirectory
        })
    ]
});

/**
 * Promise提供同步返回dev配置信息
 */
module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
            // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(
                new FriendlyErrorsPlugin({
                    compilationSuccessInfo: {
                        messages: [
                            `Your application is running here: http://${
                            devWebpackConfig.devServer.host
                            }:${port}`
                        ]
                    },
                    onErrors: config.dev.notifyOnErrors
                        ? createNotifierCallback()
                        : undefined
                })
            )
            resolve(devWebpackConfig);
        }
    })
})