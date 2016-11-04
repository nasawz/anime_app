import emitter from './emitter.js'

//接口error返回处理
export function parseError(err, res) {
    let error = '未知错误'
    if (!res || !res.body) {
        error = '未找到资源'
    } else if (res.body.error) {
        error = res.body.error.message
    } else if (err) {
        error = '网络请求失败'
    }
    emitter.emit('alert',error,'fail')
    return error
}
