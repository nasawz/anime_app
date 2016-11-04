'use strict'

const path = require('path'),
    utils = require('./utils'),
    __basename = path.dirname(__dirname),
    __env = process.env.NODE_ENV

/**
 * [config basic configuration]
 * @type {Object}
 */

let port = 9091
var config = {
    env: __env,
    webpack: {
        path: {
            src: path.resolve(__basename, 'src'),
            dev: path.resolve(__basename, 'dev'),
            pub: path.resolve(__basename, 'dist'),
        },
        defaultPath: '//localhost:'+port+'/',
        cdn: '',
        hash: '[hash:6]',
        chunkhash: '[chunkhash:6]',
        imghash: '',
        contenthash: '[contenthash:6]',
    },
    gulp: {
        path: {
            src: path.resolve(__basename, 'src')
        },
    },
    server: {                    // webpack开发环境服务器配置
        port: port,              // port for local server
        hostDirectory: ''  // http://host/hostDirectory/
    },
}

config.webpack.entry = function () {
    return utils.getJsFile(config.webpack.path.src, 'modules', 'main', ['js', 'jsx'])
}

// 合图配置
config.gulp.sprites = {
    tplpath: path.resolve(__basename, 'tools/sprite-template/less.template.handlebars'),
    imgPath: '../../style/sprites/',
    imgName: 'sprites.png',
    cssName: 'sprites.less',
    imgDest: config.gulp.path.src + '/style/sprites/',
    cssDest: config.gulp.path.src + '/style/sprites/',
}

module.exports = config
