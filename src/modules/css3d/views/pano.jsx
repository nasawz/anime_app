/**
 * create by nasa.wang
 */

import React from 'react'
import C3D from 'css3d'
import ReactDOM from 'react-dom'

const Pano = React.createClass({
    resize() {
        this.s.size(window.innerWidth, window.innerHeight).update()
    },
    requestAnimationFrame(callback) {
        setTimeout(callback, 1000 / 60)
    },
    go() {
        this.s.camera.rotate(0, 0.3, 0).updateT()
        this.requestAnimationFrame(this.go)
    },
    componentDidMount() {
        let wrapperEl = ReactDOM.findDOMNode(this)
        //创建场景
        var s = new C3D.Stage()
        this.s = s
        s.size(window.innerWidth, window.innerHeight).material({color: '#cccccc'}).update()
        wrapperEl.appendChild(s.el)

        //创建1个立方体放入场景
        var c = new C3D.Skybox()
        c.size(1024).position(0, 0, 0).material({
            front: {
                image: require('../../../img/cube/cube_FR.jpg')
            },
            back: {
                image: require('../../../img/cube/cube_BK.jpg')
            },
            left: {
                image: require('../../../img/cube/cube_LF.jpg')
            },
            right: {
                image: require('../../../img/cube/cube_RT.jpg')
            },
            up: {
                image: require('../../../img/cube/cube_UP.jpg')
            },
            down: {
                image: require('../../../img/cube/cube_DN.jpg')
            }
        }).update()
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
                CSS3D pano view
            </div>

        )
    }

})

export default Pano
