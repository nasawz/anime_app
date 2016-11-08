/**
 * create by nasa.wang
 */

import React from 'react'
import C3D from 'css3d'
import ReactDOM from 'react-dom'

const Scene3 = React.createClass({
    resize() {
        this.s.size(window.innerWidth, window.innerHeight).update()
    },
    requestAnimationFrame(callback) {
        setTimeout(callback, 1000 / 60)
    },
    go() {
        this.sp.rotate(0, 0.1, 0).updateT()

        this.requestAnimationFrame(this.go)
    },
    componentDidMount() {
        let wrapperEl = ReactDOM.findDOMNode(this)
        this.wrapperEl = wrapperEl
        //创建场景
        var s = new C3D.Stage()
        this.s = s
        s.size(window.innerWidth, window.innerHeight).material({color: '#cccccc'}).update()
        wrapperEl.appendChild(s.el)

        //创建一个三维容器（创建以方便分组使用）
        var sp = new C3D.Sprite()
        this.sp = sp
        sp.position(0, 0, -500).update()
        s.addChild(sp)

        //创建20个平面放入容器，并定义鼠标事件
        for (var i = 0; i < 20; i++) {
            var p = new C3D.Plane()
            p.size(100, 100, 100).position(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 500 - 250).rotation(Math.random() * 300 - 150, Math.random() * 300 - 150, Math.random() * 300 - 150).material({color: C3D.getRandomColor()}).buttonMode(true).update()
            sp.addChild(p)

            p.on('mouseover', function() {
                this.le.scale(1.1).update()
            })
            p.on('mouseout', function() {
                this.le.scale(1).update()
            })
            p.on('touchstart', function() {
                this.le.scale(1.1).update()
            })
            p.on('touchend', function() {
                this.le.scale(1).update()
            })
        }

        //创建4个立方体放入容器，并定义鼠标事件
        for (var j = 0; j < 4; j++) {
            var p2 = new C3D.Box()
            p2.size(100, 100, 100).position(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 500 - 250).rotation(Math.random() * 300 - 150, Math.random() * 300 - 150, Math.random() * 300 - 150).material({color: C3D.getRandomColor()}).buttonMode(true).update()
            sp.addChild(p2)
            p2.on('mouseover', function() {
                this.le.scale(1.1).update()
            })
            p2.on('mouseout', function() {
                this.le.scale(1).update()
            })
            p2.on('touchstart', function() {
                this.le.scale(1.1).update()
            })
            p2.on('touchend', function() {
                this.le.scale(1).update()
            })
        }

        window.onresize = function() {
            this.resize()
        }
        this.resize()
        this.requestAnimationFrame(this.go)
    },
    render() {
        return (
            <div>
                CSS3D scene3 view
            </div>
        )
    }

})

export default Scene3
