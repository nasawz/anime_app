/**
 * create by nasa.wang
 */

import React from 'react'
import ReactDOM from 'react-dom'
import anime from 'animejs'

const Funcb = React.createClass({
    componentDidMount() {

        var sectionEl = ReactDOM.findDOMNode(this.refs.sectionEl)

        function delayFunc() {
            // console.log('BEGIN')
            sectionEl.classList.add('begin')
        }

        function updateFunc() {
            // console.log('UPDATE')
            sectionEl.classList.add('update')
        }

        function completeFunc() {
            // console.log('COMPLETE')
            sectionEl.classList.add('complete')
        }

        anime({
            targets: sectionEl.querySelectorAll('div'),
            translateY: 100,
            scale: 1.5,
            rotate: {
                value: 360,
                duration: function(el, i) {
                    return 2000 + (i * 500)
                },
                delay: function(el, i) {
                    return 2000 + (i * 500)
                },
                easing: 'easeOutQuad'
            },
            delay: function(el, i) {
                return 1000 + (i * 500)
            },
            duration: function(el, i) {
                return 1000 + (i * 500)
            },
            begin: delayFunc,
            update: updateFunc,
            complete: completeFunc
        })
    },
    render() {
        return (
            <div className='Funcb'>
                <section ref='sectionEl'>
                    <div></div>
                    <div></div>
                    <div></div>
                </section>
            </div>

        )
    }

})

export default Funcb
