/**
 * create by nasa.wang
 */
import React from 'react'
import Toast from 'cex/components/toast/toast.jsx'
import Loading from 'cex/components/loading/loading.jsx'
import ActionSheet from 'cex/components/actionsheet/actionsheet.jsx'
import emitter from './emitter.js'
import request from 'superagent'
import variable from './variable.js'
import {parseError} from './parse-error.js'
import {
    getTenantAndLoginType
} from './tenant-logintype.js'
const Container = React.createClass({
    //忽略不需要认证的地址
    chkIngorePath() {
        let ignorePaths = ['/login']
        let isIngore = false
        let currPath = window.location.href
        ignorePaths.forEach((item) => {
            if (currPath.indexOf(item) > 0) {
                isIngore = true
                return
            }
        })
        return isIngore
    },
    goLogin(){
        let self = this
        setTimeout(function () {
            let isIngore = self.chkIngorePath()
            if (!isIngore) {
                let _tts = getTenantAndLoginType(window.location.href)
                let tenant = _tts[1]
                let loginType = _tts[0]
                let path = encodeURIComponent(window.location.href)
                let goPath = `${window.location.origin}/-${loginType}-/-${tenant}-/login-${loginType}.html?path=${path}`
                window.location.href = goPath
            }
        }, 1000)
    },
    touch() {
        let req = request.get('/api/' + variable.api_version + '/userinfo')
        req.timeout(10000)
        req.end((err, res) => {
            if (err || !res || res.body.error) {
                parseError(err, res)
                this.goLogin()
            } else {
                this.setState({
                    user: res.body,
                })

            }
        })
    },
    clickSheet(key) {
        if (this.actionSheetFun) {
            this.actionSheetFun(key)
        }
    },
    componentWillMount() {
        let isIngore = this.chkIngorePath()
        if (!isIngore) {
            // this.touch()
        }
        let self = this
        emitter.addListener('alert', (message, type) => {
            self.setState({
                alertShow: true,
                alertMessage: message,
                toastType: type
            })
        })
        emitter.addListener('loading', (message, show) => {
            self.setState({
                loadShow: show,
                loadMessage: message,
            })
        })
        emitter.addListener('actionsheet', (acMenus, fun) => {
            this.actionSheetFun = fun
            self.setState({
                acShow: true,
                acMenus: acMenus,
            })
        })
        emitter.addListener('getuser', (fun) => {
            fun(this.state.user)
        })
    },
    componentDidMount() {
        this.actionSheetFun = null
    },
    closeToast() {
        this.setState({
            alertShow: false
        })
    },
    closelSheet() {
        this.actionSheetFun = null
        this.setState({
            acShow: false
        })
    },
    getInitialState() {
        return {
            alertShow: false,
            alertMessage: '',
            toastType: 'fail',

            loadShow: false,
            loadMessage: '',

            acShow: false,
            acMenus: {},
            user: null
        }
    },

    render() {
        let children = null
        // let isIngore = this.chkIngorePath()
        // if (this.state.user || isIngore === true) {
        //     children = this.props.children
        // }
        children = this.props.children
        let {alertShow, alertMessage, toastType, loadShow, loadMessage, acShow, acMenus} = this.state
        return (
            <div className='cex-Container'>
                { children }
                <Toast show={alertShow} type={toastType} closeToast={this.closeToast}>{alertMessage}
                </Toast>
                <Loading show={loadShow} text={loadMessage} />
                <ActionSheet show={acShow} menus={acMenus} clickSheet={this.clickSheet} closeSheet={this.closelSheet} showCancel />
            </div>
        )
    }
})
export default Container
