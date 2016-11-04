/**
 * create by nasa.wang
 */

import {
    PropTypes
} from 'react'
import {
    navigate,
    replaceNavigate
} from 'react-mini-router'

import join from 'lodash/join'
import merge from 'lodash/merge'
import {
    stringify,
    parse
} from 'cex/helpers/browser-safe.js'
import {
    getTenantAndLoginType
} from './tenant-logintype.js'

module.exports = {
    contextTypes: {
        runType: PropTypes.string.isRequired
    },
    generatePath(params, querys, runType, prefix, jump = false) {
        if (!runType) runType = this.context.runType
        if (runType == 'spa') {
            return (jump ? prefix : '/') + join(params, '/') + (querys ? '?' + stringify(querys) : '')
        } else {
            return join(params, '-') + '.html' + (querys ? '?' + stringify(querys) : '')
        }
    },
    navTo(params, querys, runType, prefix, jump = false) {
        if (!runType) runType = this.context.runType
        if (!prefix) prefix = ''
        if (runType == 'spa') {
            let path = this.generatePath(params, querys, runType, prefix, jump)
            navigate(path)
        } else {
            let _querys = parse(window.location.search)
            let path = this.generatePath(params, merge({}, _querys, querys), runType, prefix, jump)
            let _tts = getTenantAndLoginType(window.location.href)
            let tenant = _tts[1]
            let loginType = _tts[0]
            let goPath = `${window.location.origin}/-${loginType}-/-${tenant}-/${path}`
            window.location.href = goPath
        }
    },
    navReplace(params, querys, runType, prefix, jump = false) {
        if (!runType) runType = this.context.runType
        if (runType == 'spa') {
            let path = this.generatePath(params, querys, runType, prefix, jump)
            if (jump) {
                window.location.href = path
            } else {
                replaceNavigate(path)
            }
        } else {
            let _querys = parse(window.location.search)
            let path = this.generatePath(params, merge({}, _querys, querys), runType, prefix, jump)
            let _tts = getTenantAndLoginType(window.location.href)
            let tenant = _tts[1]
            let loginType = _tts[0]
            let goPath = `${window.location.origin}/-${loginType}-/-${tenant}-/${path}`
            window.location.href = goPath
        }
    },
}
