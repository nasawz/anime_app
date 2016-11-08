/**
 * create by nasa.wang
 */

import React from 'react'
import C3D from 'css3d'
import ReactDOM from 'react-dom'

const Scene1 = React.createClass({
    resize() {
        this.s.size(window.innerWidth, window.innerHeight).update()
    },
    requestAnimationFrame(callback) {
        setTimeout(callback, 1000 / 60)
    },
    go() {
        this.scene.rotate(0, 1, 0).updateT()

        this.scene.p3.rotate(-1, 0, 0).updateT()

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

        //创建场景
        var scene = C3D.create({
            type: 'sprite',
            position: [
                0, 0, -s.fov
            ],
            children: [
                {
                    type: 'plane',
                    el: wrapperEl.querySelector('.face'),
                    name: 'p1',
                    size: [100],
                    position: [
                        100, 0, 0
                    ],
                    rotation: [
                        45, 0, 0
                    ],
                    material: [
                        {
                            color: C3D.getRandomColor()
                        }
                    ]
                }, {
                    type: 'plane',
                    name: 'p2',
                    size: [100],
                    position: [
                        -100, 0, 0
                    ],
                    rotation: [
                        -45, 0, 0
                    ],
                    material: [
                        {
                            color: C3D.getRandomColor()
                        }
                    ]
                }, {
                    type: 'plane',
                    name: 'p3',
                    size: [100],
                    position: [
                        0, 100, 0
                    ],
                    rotation: [
                        0, 45, 0
                    ],
                    material: [
                        {
                            color: C3D.getRandomColor()
                        }
                    ]
                }, {
                    type: 'plane',
                    name: 'p4',
                    size: [100],
                    position: [
                        0, -100, 0
                    ],
                    rotation: [
                        0, -45, 0
                    ],
                    material: [
                        {
                            color: C3D.getRandomColor()
                        }
                    ]
                }
            ]
        })
        this.scene = scene
        s.addChild(scene)

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

export default Scene1
