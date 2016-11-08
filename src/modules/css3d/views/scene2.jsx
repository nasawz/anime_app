/**
 * create by nasa.wang
 */

import React from 'react'
import C3D from 'css3d'
import ReactDOM from 'react-dom'

const Scene2 = React.createClass({
    resize() {
        this.s.size(window.innerWidth, window.innerHeight).update()
    },
    requestAnimationFrame(callback) {
        setTimeout(callback, 1000 / 60)
    },
    go() {
        this.p.rotate(0, 1, 0).updateT()
        this.c.rotate(0, -1, 0).updateT()

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

        //创建1个平面放入场景
        var p = new C3D.Plane()
        this.p = p
        p.name('ppp').size(100).position(0, 0, -s.fov).rotation(0, 0, 0).material({color: C3D.getRandomColor(), image: require('../../../img/face.png')}).filter({blur: ['5px'], brightness: [3]}).update()
        s.addChild(p)

        //创建1个图片放入场景
        var p2 = new C3D.Plane({el: wrapperEl.querySelector('.face')})
        p2.name('ppp2').size(100).position(0, 200, -s.fov).rotation(0, 0, 0).filter({blur: ['5px'], brightness: [3]}).update()
        s.addChild(p2)

        //创建1个立方体放入场景
        var c = new C3D.Box()
        this.c = c
        c.size(100).position(0, -200, -s.fov).rotation(0, 0, 0).visibility({alpha: 0.5}).material({color: C3D.getRandomColor()}).update()
        s.addChild(c)

        window.onresize = function() {
            this.resize()
        }
        this.resize()
        this.requestAnimationFrame(this.go)
    },
    render() {
        return (
            <div>
                <img className="face" src={require('../../../img/face.png')}/>
            </div>
        )
    }

})

export default Scene2
