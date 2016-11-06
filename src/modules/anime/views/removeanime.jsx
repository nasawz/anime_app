/**
 * create by nasa.wang
 */

import React from 'react'
import ReactDOM from 'react-dom'
import anime from 'animejs'

const Removeanime = React.createClass({
    doDisable(e) {
        anime.remove(e.target)
        e.target.classList.add('disabled')
    },
    componentDidMount() {
        let divs = ReactDOM.findDOMNode(this.refs.article).querySelectorAll('div')
        anime({
            targets: divs,
            translateX: function() {
                return anime.random(-6, 6) + 'rem'
            },
            translateY: function() {
                return anime.random(-6, 6) + 'rem'
            },
            scale: function() {
                return anime.random(10, 20) / 10
            },
            rotate: function() {
                return anime.random(-360, 360)
            },
            delay: function() {
                return 400 + anime.random(0, 500)
            },
            duration: function() {
                return anime.random(1000, 2000)
            },
            direction: 'alternate',
            loop: true
        })

        // document.onmousemove = function(e) {
        //     console.log(e.target);
        //     // if (e.target.matches(divs)) {
        //     //     anime.remove(e.target)
        //     //     e.target.classList.add('disabled')
        //     // }
        // }

    },
    render() {
        return (
            <div className='Removeanime'>
                <section>
                    <article ref='article'>
                        <div onClick={this.doDisable} className="blue"></div>
                        <div onClick={this.doDisable} className="red"></div>
                        <div onClick={this.doDisable} className="green"></div>
                    </article>
                </section>
            </div>

        )
    }

})

export default Removeanime
