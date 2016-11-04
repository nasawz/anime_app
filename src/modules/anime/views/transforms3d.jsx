/**
 * create by nasa.wang
 */

import React from 'react'
import ReactDOM from 'react-dom'
import anime from 'animejs'

const Transforms3d = React.createClass({
    componentDidMount() {
        let wrapperEl = ReactDOM.findDOMNode(this)

        var numberOfThings = 25
        let els = []
        function createEl(className) {
            var el = document.createElement('div')
            el.classList.add(className)
            wrapperEl.appendChild(el)
            els.push(el)
        }

        for (var i = 0; i < numberOfThings; i++) {
            createEl('red')
            createEl('blue')
            createEl('green')
            createEl('yellow')
        }

        anime({
            targets: els,
            translateZ: 300,
            rotateX: 180,
            rotateY: 180,
            delay: function(el, i) {
                return i * 5
            },
            loop: true,
            direction: 'alternate',
            easing: 'easeOutQuad'
        })

    },
    render() {
        return (
            <div className='wrapper'>
            </div>

        )
    }

})

export default Transforms3d
