/**
 * create by nasa.wang
 */

import React from 'react'
import ReactDOM from 'react-dom'

const Domstress = React.createClass({
    componentDidMount() {
        let container = ReactDOM.findDOMNode(this)
        var maxElements = 200
        var duration = 7000
        var toAnimate = []
        var w = window.innerWidth > window.innerHeight
            ? window.innerWidth
            : window.innerHeight
        var colors = ['#FF324A', '#31FFA6', '#206EFF', '#FFFF99']

        var createElements = (function() {
            var fragment = document.createDocumentFragment()
            for (var i = 0; i < maxElements; i++) {
                var el = document.createElement('div')
                el.style.background = colors[anime.random(0, 3)]
                el.style.transform = 'rotate(' + anime.random(-360, 360) + 'deg)'
                toAnimate.push(el)
                fragment.appendChild(el)
            }
            container.appendChild(fragment)
        })()

        var animate = function(el) {
            anime({
                targets: el,
                rotate: anime.getValue(el, 'rotate'),
                translateX: [
                    0, w / 2
                ],
                translateY: [
                    0, w / 2
                ],
                scale: [
                    0, 2
                ],
                delay: anime.random(0, duration),
                duration: duration,
                easing: "easeInCubic",
                loop: true
            })
        }

        toAnimate.forEach(animate)

    },
    render() {
        return (
            <div className='Domstress'>
            </div>
        )
    }

})

export default Domstress
