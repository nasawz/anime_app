import request from 'superagent'

import variable from './variable.js'
module.exports = {
    componentWillMount() {
        let self = this
        self.signature()
    },
    signature(onSuccess) {
        let self = this
        let url = 'http://p.baleina.cn/puzzle/api/' + variable.weixn_signature_key + '/get_jsConfig'
        request.post(url).send({
            url: window.location.href.split('#')[0]
        }).end(function(err, res) {
            var json = res.body
            self.config(json, onSuccess)
        })
        // let self = this
        // let url = global.config.api_host + '/api/v1/corp/jweixin?tenant='+ global.config.tenant+'&url='+window.location.href.split('#')[0]
        // request.get(url).end(function(err, res) {
        //   var json = res.body
        //   self.config(json, onSuccess)
        // })
    },
    config(json, onSuccess) {
        window.wx.config({
            debug: false,
            appId: json['appId'],
            timestamp: json['timestamp'],
            nonceStr: json['nonceStr'],
            signature: json['signature'],
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'startRecord',
                'stopRecord',
                'onVoiceRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'onVoicePlayEnd',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'translateVoice',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'openProductSpecificView',
                'addCard',
                'chooseCard',
                'openCard'
            ]
        })

        window.wx.ready(function() {
            global.signature = true
            if (onSuccess) {
                onSuccess()
            }
            global.changeWx()
        })

        window.wx.error(function() {
            global.signature = false
        })
    }
}

global.changeWx = function() {

    window.wx.onMenuShareAppMessage({
        title: global._wxData.wxtitle,
        desc: global._wxData.wxdesc,
        link: global._wxData.wxlink,
        imgUrl: global._wxData.wximgUrl,
        trigger: function() {},
        success: function() {
            if (window.shareSuccess) {
                window.shareSuccess()
            }
        },
        cancel: function() {},
        fail: function() {}
    })

    window.wx.onMenuShareTimeline({
        title: global._wxData.wxtitle + '，' + global._wxData.wxdesc,
        link: global._wxData.wxlink,
        imgUrl: global._wxData.wximgUrl,
        trigger: function() {},
        success: function() {
            if (window.shareSuccess) {
                window.shareSuccess()
            }
        },
        cancel: function() {},
        fail: function() {}
    })
}

// TODO: set weixin share data
let shareImage = ''
global._wxData = {
    wxtitle: '',
    wxlink: '',
    wxdesc: '',
    wximgUrl: shareImage
}

global.setWxTitle = function(title) {
    global._wxData.wxtitle = global.config.title + ' ' + title
    global.changeWx()
}
global.setWxDesc = function(desc) {
    global._wxData.wxdesc = desc
    global.changeWx()
}
global.resetWxData = function() {
    // TODO: reset weixin share data
    // global._wxData = {
    //     wxtitle: global.config.title,
    //     wxlink: window.config.host,
    //     wxdesc: global.config.desc,
    //     wximgUrl: shareImage
    // }
    global.changeWx()
}
