/**
 * create by nasa.wang
 */
import React, {PropTypes} from 'react'
import {RouterMixin} from 'react-mini-router'

import Container from '../../common/container.jsx'
import Home from '../containers/homeContainer.js'
import Cylinder from '../containers/cylinderContainer.js'
import Pano from '../containers/panoContainer.js'
import Rubik from '../containers/rubikContainer.js'

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
        '/cylinder': 'cylinder',
        '/pano': 'pano',
        '/rubik': 'rubik',
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
    cylinder(params) {
        return <div><Cylinder params={params} /></div>
    },
    pano(params) {
        return <div><Pano params={params} /></div>
    },
    rubik(params) {
        return <div><Rubik params={params} /></div>
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
