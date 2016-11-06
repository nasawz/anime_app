'use strict'

const path = require('path'),
    // utils = require('./utils'),
    webpack = require('webpack')

var config = require('./config'),
    configWebpack = config.webpack

var HtmlResWebpackPlugin = require('html-res-webpack-plugin'),
    Clean = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin-steamer'),
    CopyWebpackPlugin = require('copy-webpack-plugin-hash'),
    WebpackMd5Hash = require('webpack-md5-hash'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')


var forEach = require('lodash/forEach')

var prodConfig = {
    entry: configWebpack.entry(),
    output: {
        publicPath: configWebpack.cdn,
        path: path.join(configWebpack.path.pub),
        filename: 'js/[name]-' + configWebpack.chunkhash + '.js',
        chunkFilename: 'chunk/[name]-' + configWebpack.chunkhash + '.js',
    },
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel',
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css!postcss!less',{
                    publicPath:'../'
                })
            }, {
                test: /\.css/,
                loader: ExtractTextPlugin.extract('style!css!postcss',{
                    publicPath:'../'
                })
            }, {
                test: /\.(eot|woff|ttf|svg)/,
                loader: 'url-loader?limit=1000&name=fonts/[name].[ext]'
            }, {
                test: /\.html$/,
                loader: 'html-loader'
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'url-loader?limit=1000&name=img/[name]' + configWebpack.hash + '.[ext]',
                    // 压缩png图片
                    'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
                ],
                include: path.resolve(configWebpack.path.src)
            }, {
                test: /\.ico$/,
                loader: 'url-loader?name=[name].[ext]',
                include: path.resolve(configWebpack.path.src)
            },
        ],
        noParse: [

        ]
    },
    resolve: {
        moduledirectories:['node_modules', configWebpack.path.src],
        extensions: ['', '.js', '.jsx', '.es6', 'css', 'scss', 'png', 'jpg', 'jpeg', 'ico'],
        alias: {
            // 使用压缩版本redux
            'redux': 'redux/dist/redux.min',
            'react-redux': 'react-redux/dist/react-redux',
            'safe': path.join(configWebpack.path.src, '/modules/common/safe.jsx'),
            'cex': path.join(configWebpack.path.src,'/components/cex/src'),
        }
    },
    postcss: function () {
        return [require('autoprefixer'), require('precss')]
    },
    plugins: [
        // remove previous pub folder
        new Clean(['doc'], {root: path.resolve()}),
        // inject process.env.NODE_ENV so that it will recognize if (process.env.NODE_ENV === '__PROD__')
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(config.env)
            }
        }),
        new CopyWebpackPlugin([
            {
                from: configWebpack.path.src+'/libs/',
                to: 'libs/'
            }
        ], {
            namePattern: '[name]-' + configWebpack.contenthash + '.js'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin(
            {
                name: 'vendor',
                filename: 'js/[name]-' + configWebpack.chunkhash + '.js'
            }
        ),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: { removeAll: true },
                reduceIdents: {
                    keyframes: false
                },
                discardUnused: {
                    keyframes: false
                }
            },
            canPrint: true
        }),
        new ExtractTextPlugin('css/[name]-' + configWebpack.contenthash + '.css', {
            filenamefilter: function(filename) {
                return filename.replace('/js', '')
            },
            allChunks: true,
            disable: false,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new WebpackMd5Hash(),
        new webpack.NoErrorsPlugin()
    ],
    // 使用外链
    externals: {
        'wx': 'window.wx',
        'animejs': 'anime',
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    watch: false, //  watch mode
}

prodConfig.addPlugins = function(plugin, opt) {
    prodConfig.plugins.push(new plugin(opt))
}

forEach(prodConfig.entry,function (value) {
    let conf = require(value[0].replace(/(jsx|js)/g,'json'))
    prodConfig.addPlugins(HtmlResWebpackPlugin, {
        filename: conf.pub.filename + '.html',
        title:conf.pub.title,
        template: 'tools/template.html',
        favicon: 'src/favicon.ico',
        chunks: conf.pub.chunks,
        templateContent: function(tpl) {
            var regex = new RegExp('{title}', 'ig')
            tpl = tpl.replace(regex, conf.pub.title)
            return tpl
        },
        htmlMinify: {
            removeComments: true,
            collapseWhitespace: true,
        }
    })
})

module.exports = prodConfig
