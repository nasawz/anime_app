/* eslint-disable no-alert, no-console */
var webpack = require('webpack'),
    config = require('./config'),
    isProduction = (config.env === '__PROD__'),
    gutil = require('gulp-util')

var ProgressPlugin = require('webpack/lib/ProgressPlugin')
var ProgressBar = require('progress')
const bar = new ProgressBar(':bar [:percent] :message', {
    total: 50
})

if (isProduction) {
    var compiler = webpack(require('./webpack.pub'))
    compiler.apply(
        new ProgressPlugin((percentage, msg) => {
            bar.update(percentage, {
                message: msg
            })
        })
    )
    compiler.run(function(err, stats) {
        if (!err) {
            gutil.log('[webpack:pub]', stats.toString({
                chunks: false, // Makes the build much quieter
                colors: true
            }))
        }
        else {
            console.log(err)
        }
    })
}
else {
    require('./webpack.server')
}
