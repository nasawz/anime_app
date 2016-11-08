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
import Scene1 from '../containers/scene1Container.js'
import Scene2 from '../containers/scene2Container.js'
import Scene3 from '../containers/scene3Container.js'

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
        '/scene1': 'scene1',
        '/scene2': 'scene2',
        '/scene3': 'scene3',
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
    scene1(params) {
        return <div><Scene1 params={params} /></div>
    },
    scene2(params) {
        return <div><Scene2 params={params} /></div>
    },
    scene3(params) {
        return <div><Scene3 params={params} /></div>
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
