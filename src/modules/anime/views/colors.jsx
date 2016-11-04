/**
 * create by nasa.wang
 */

import React from 'react'
import anime from 'animejs'

const Colors = React.createClass({
    componentDidMount() {
        var hex = anime({
            targets: '.hex',
            backgroundColor: '#319BFF',
            duration: 5000,
            loop: true,
            direction: 'alternate',
            easing: 'easeOutQuad'
        })
        var rgb = anime({
            targets: '.rgb',
            backgroundColor: 'rgb(49,155,255)',
            // translateZ: 300,
            // rotateX: 180,
            // rotateY: 180,
            duration: 5000,
            loop: true,
            direction: 'alternate',
            easing: 'easeOutQuad'
        })
        var hsl = anime({
            targets: '.hsl',
            backgroundColor: 'hsl(210,100%,60%)',
            duration: 5000,
            loop: true,
            direction: 'alternate',
            easing: 'easeOutQuad'
        })
    },
    render() {
        return (
            <div className='Colors'>
                <div className="hex">hex</div>
                <div className="rgb">rgb</div>
                <div className="hsl">hsl</div>
            </div>
        )
    }

})

export default Colors
