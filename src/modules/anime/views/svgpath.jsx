/**
 * create by nasa.wang
 */

import React from 'react'
import anime from 'animejs'

const Svgpath = React.createClass({
    componentDidMount() {
        anime({targets: 'svg', rotate: 180, duration: 2000, loop: true})
        anime({
            targets: 'path',
            d: 'M72,160 C72,115 16,84 50,50 C84,16 115,72 160,72 C205,72 236,16 270,50 C304,84 248,115 248,160 C248,205 304,236 270,270 C236,304 205,248 160,248 C115,248 84,304 50,270 C16,236 72,205 72,160 Z',
            fill: [
                'rgb(100,200,0)', 'rgb(255,0,0)'
            ],
            duration: 2000,
            direction: 'alternate',
            loop: true
        })
    },
    render() {
        return (
            <div className='Svgpath'>
                <svg width="320px" height="320px" viewBox="0 0 320 320">
                    <path fill="rgb(100,200,0)" d="M32,160 C32,115 36,104 70,70 C104,36 115,32 160,32 C205,32 216,36 250,70 C284,104 288,115 288,160 C288,205 284,216 250,250 C216,284 205,288 160,288 C115,288 104,284 70,250 C36,216 32,205 32,160 Z"></path>
                </svg>
            </div>

        )
    }

})

export default Svgpath
