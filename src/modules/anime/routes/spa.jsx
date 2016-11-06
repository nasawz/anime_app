/**
 * create by nasa.wang
 */
import React, {PropTypes} from 'react'
import {RouterMixin} from 'react-mini-router'

import Container from '../../common/container.jsx'
import Home from '../containers/homeContainer.js'
import Transforms3d from '../containers/transforms3dContainer.js'
import Colors from '../containers/colorsContainer.js'
import Domstress from '../containers/domstressContainer.js'
import Easings from '../containers/easingsContainer.js'
import Motionpath from '../containers/motionpathContainer.js'

const Routes = React.createClass({
    mixins: [RouterMixin],
    childContextTypes: {
        runType: PropTypes.string.isRequired
    },
    getChildContext: function() {
        return {
            runType: 'spa'
        }
    },
    routes: {
        '/home': 'home',
        '/transforms3d': 'transforms3d',
        '/colors': 'colors',
        '/domstress': 'domstress',
        '/easings': 'easings',
        '/motionpath': 'motionpath',
    },
    render () {
        return (
            <Container>
                { this.renderCurrentRoute() }
            </Container>
        )
    },
    home(params) {
        return <div><Home params={params} /></div>
    },
    transforms3d(params) {
        return <div><Transforms3d params={params} /></div>
    },
    colors(params) {
        return <div><Colors params={params} /></div>
    },
    domstress(params) {
        return <div><Domstress params={params} /></div>
    },
    easings(params) {
        return <div><Easings params={params} /></div>
    },
    motionpath(params) {
        return <div><Motionpath params={params} /></div>
    },
    notFound(path) {
        if (path == '/') {
            return <div />
        }else{
            return <div className="not-found">Page Not Found: {path}</div>
        }
    }
})

export default Routes
