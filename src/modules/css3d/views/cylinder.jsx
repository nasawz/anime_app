/**
 * create by nasa.wang
 */

import React from 'react'
import C3D from 'css3d'
import ReactDOM from 'react-dom'

const Cylinder = React.createClass({
    panoRect: {
        w: 2586,
        h: 1170
    },
    bgData: [
        {
            url: require('../../../img/zwj/p1.png')
        }, {
            url: require('../../../img/zwj/p2.png')
        }, {
            url: require('../../../img/zwj/p3.png')
        }, {
            url: require('../../../img/zwj/p4.png')
        }, {
            url: require('../../../img/zwj/p5.png')
        }, {
            url: require('../../../img/zwj/p6.png')
        }, {
            url: require('../../../img/zwj/p7.png')
        }, {
            url: require('../../../img/zwj/p8.png')
        }, {
            url: require('../../../img/zwj/p9.png')
        }, {
            url: require('../../../img/zwj/p10.png')
        }, {
            url: require('../../../img/zwj/p11.png')
        }, {
            url: require('../../../img/zwj/p12.png')
        }, {
            url: require('../../../img/zwj/p13.png')
        }, {
            url: require('../../../img/zwj/p14.png')
        }, {
            url: require('../../../img/zwj/p15.png')
        }, {
            url: require('../../../img/zwj/p16.png')
        }, {
            url: require('../../../img/zwj/p17.png')
        }, {
            url: require('../../../img/zwj/p18.png')
        }, {
            url: require('../../../img/zwj/p19.png')
        }, {
            url: require('../../../img/zwj/p20.png')
        }
    ],
    createPano(imgs, rect) {
        var _len = imgs.length
        var _step = rect.w / _len
        var _radius = Math.floor(_step / 2 / Math.tan(Math.PI / _len))

        var _sp = new C3D.Sprite()
        for (var i = 0; i < _len; i++) {
            var _p = new C3D.Plane()
            var _r = 360 / _len * i
            var _a = Math.PI * 2 / _len * i
            _p.size(_step, rect.h).position(Math.sin(_a) * _radius, 0, -Math.cos(_a) * _radius).rotation(0, -_r, 0).material({image: imgs[i].url, repeat: 'no-repeat', bothsides: false}).update()
            _sp.addChild(_p)
        }

        return _sp
    },
    resize() {
        this.s.size(window.innerWidth, window.innerHeight).update()
    },
    requestAnimationFrame(callback) {
        setTimeout(callback, 1000 / 60)
    },
    go() {
        this.pano.rotate(0, 0.4, 0).updateT()
        // this.s.camera.rotate(0, 0.3, 0).updateT()
        this.requestAnimationFrame(this.go)
    },
    componentDidMount() {
        let wrapperEl = ReactDOM.findDOMNode(this)
        //创建场景
        var s = new C3D.Stage()
        this.s = s
        s.size(window.innerWidth, window.innerHeight).material({color: '#cccccc'}).update()
        wrapperEl.appendChild(s.el)

        var pano = this.createPano(this.bgData, this.panoRect)
        this.pano = pano
        pano.position(0, 0, -400).updateT()
        s.addChild(pano)

        window.onresize = function() {
            this.resize()
        }
        this.resize()
        this.requestAnimationFrame(this.go)
    },
    render() {
        return (
            <div>

            </div>
        )
    }

})

export default Cylinder
