/**
 * create by nasa.wang
 */

import React from 'react'
import C3D from 'css3d'
import ReactDOM from 'react-dom'

const Rubik = React.createClass({
    resize() {
        this.s.size(window.innerWidth, window.innerHeight).update()
    },
    requestAnimationFrame(callback) {
        setTimeout(callback, 1000 / 60)
    },
    go() {
        // this.s.camera.rotate(0, 0.3, 0).updateT()
//
        this.angleX += (this.curMouseX - this.lastMouseX + this.lastAngleX - this.angleX) * 0.3
        this.angleY += (this.curMouseY - this.lastMouseY + this.lastAngleY - this.angleY) * 0.3
        this.angleY = Math.max(-60, Math.min(60, this.angleY))
//         var _len = this.sp.children.length
//            for(var i=0; i<_len; i++){
//                var _p = this.sp.children[i]
// //                _p.rotation(-this.angleY, this.angleX, 0).update()
//                    _p.rotate(0.0, 0.2, 0).update()
//            }

        this.sp.rotation(-this.angleY, this.angleX, 0).updateT()
        this.requestAnimationFrame(this.go)
    },
    mouseDownHandler(evt){
        this.lastMouseX = evt.targetTouches[0].pageX
        this.lastMouseY = evt.targetTouches[0].pageY
        this.lastAngleX = this.angleX
        this.lastAngleY = this.angleY
        this.curMouseX = evt.targetTouches[0].pageX
        this.curMouseY = evt.targetTouches[0].pageY
        this.wrapperEl.addEventListener('mousemove', this.mouseMoveHandler)
        this.wrapperEl.addEventListener('touchmove', this.mouseMoveHandler)
    },
    mouseUpHandler(){
        // this.curMouseX = evt.targetTouches[0].pageX
        // this.curMouseY = evt.targetTouches[0].pageY
        this.wrapperEl.removeEventListener('mousemove', this.mouseMoveHandler)
        this.wrapperEl.removeEventListener('touchmove', this.mouseMoveHandler)
    },
    mouseMoveHandler(evt){
        this.curMouseX = evt.targetTouches[0].pageX
        this.curMouseY = evt.targetTouches[0].pageY
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
        sp.position(0, 0, -800).update()
        s.addChild(sp)

        for (var j = 0; j < 6; j++) {
            for (var i = 0; i < 9; i++) {
                var _color = C3D.getRandomColor()
                var p = new C3D.Plane()
                var _x = 50 - 100 + (i % 3) * 100
                var _y = 50 - 100 + (i / 3 | 0) * 100
                var _z = -150
                p.size(100, 100, 0).origin(_x, _y, _z)
                switch (j) {
                    case 0:
                        p.rotation(0, 0, 0).material({color: _color})
                        break
                    case 1:
                        p.rotation(0, 90, 0).material({color: _color})
                        break
                    case 2:
                        p.rotation(0, 180, 0).material({color: _color})
                        break
                    case 3:
                        p.rotation(0, 270, 0).material({color: _color})
                        break
                    case 4:
                        p.rotation(90, 0, 0).material({color: _color})
                        break
                    case 5:
                        p.rotation(-90, 0, 0).material({color: _color})
                        break
                }
                p.update()
                sp.addChild(p)
            }
        }


        wrapperEl.addEventListener('mousedown', this.mouseDownHandler)
        wrapperEl.addEventListener('touchstart', this.mouseDownHandler)
        wrapperEl.addEventListener('mouseup', this.mouseUpHandler)
        wrapperEl.addEventListener('touchend', this.mouseUpHandler)
        // wrapperEl.addEventListener('touchmove', this.mouseMoveHandler)
        this.isMoving = false
        this.lastMouseX = 0
        this.lastMouseY = 0
        this.curMouseX = 0
        this.curMouseY = 0
        this.lastAngleX = 0
        this.lastAngleY = 0
        this.angleX = 0
        this.angleY = 0

        window.onresize = function() {
            this.resize()
        }
        this.resize()
        this.requestAnimationFrame(this.go)
    },
    render() {
        return (
            <div>
                CSS3D rubik view
            </div>

        )
    }

})

export default Rubik
