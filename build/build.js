'use strict'
//require('./check-versions')()
const process = require('process');
const webpack = require('webpack');
//const config = require('../config');
const webpackConfig = require('./webpack.prod.conf');

//编译打包
const compiler = webpack(webpackConfig);
compiler.run(function (err, stats) {
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        process.exit(1);
    }

    console.log(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }));

    if (stats.hasErrors()) {
        process.exit(1);
    }
});