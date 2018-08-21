/**
 * webpack.base.conf.js
 * created by sgb on 2018/08/21
 */
'use strict'
//必须配合vue-template-compiler模块
const path = require('path')
const { assetsPath, resolvePath } = require('./utils')
const config = require('../config')
const { VueLoaderPlugin } = require('vue-loader')
const vueLoaderConfig = require('./vue-loader.conf')

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolvePath('src'), resolvePath('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
})

const pwd = path.resolve(__dirname, '../'); //绝对路径

module.exports = {
    mode: "development",
    context: pwd,
    entry: {
        app: './src/main.js'
    },
    output: {
        //打包输出路径
        path: config.build.assetsRoot,
        //打包文件名模版
        //filename: '[name].js',
        //打包后index.html引入静态文件相对路径
        publicPath:
            process.env.NODE_ENV === 'production'
                ? config.build.assetsPublicPath
                : config.dev.assetsPublicPath
    },
    //解析模版选项
    resolve: {
        //模版查找目录
        modules: [
            "node_modules",
            pwd
        ],
        //使用的拓展名
        extensions: ['.js', '.vue', '.json'],
        alias: {
            // @指向根目录下src目录
            '@': resolvePath('src')
        }
    },
    module: {
        rules: [
            //...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    resolvePath('src'),
                    resolvePath('node_modules/webpack-dev-server/client')
                ]
            }, {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: [resolvePath('src/icons')],
                options: {
                    symbolId: 'icon-[name]'
                }
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                //  排除icons文件夹,图片存放于images文件夹内
                exclude: [resolvePath('src/icons')],
                options: {
                    limit: 10000,
                    name: assetsPath('img/[name].[hash:7].[ext]')
                }
            }, {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('media/[name].[hash:7].[ext]')
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [new VueLoaderPlugin()],
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}