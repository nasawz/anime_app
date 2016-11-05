/**
 * create by nasa.wang
 */

import React from 'react'
import ReactDOM from 'react-dom'
import anime from 'animejs'

const Easings = React.createClass({
    componentDidMount() {

        let wrapperEl = ReactDOM.findDOMNode(this)
        var easingList = Object.keys(anime.easings).sort(function(a, b) {
            return (a < b)
                ? -1
                : (a > b)
                    ? 1
                    : 0
        })

        function createEaseEl(easeName) {
            var el = document.createElement('div')
            var ballEl = document.createElement('div')
            var textEl = document.createElement('p')
            el.classList.add(easeName)
            el.classList.add('easing')
            ballEl.classList.add('blue')
            textEl.innerHTML = easeName
            el.appendChild(ballEl)
            el.appendChild(textEl)
            wrapperEl.appendChild(el)
            anime({
                targets: ballEl,
                translateY: '74vh',
                loop: true,
                direction: 'alternate',
                duration: 2000,
                easing: easeName
            })
        }

        easingList.forEach(createEaseEl)
    },
    render() {
        return (
            <div className='Easings'>
            </div>
        )
    }

})

export default Easings
