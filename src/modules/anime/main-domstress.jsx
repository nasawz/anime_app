/**
 * create by nasa.wang
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'

import Routes from '../common/alone.jsx'
import Domstress from './containers/domstressContainer.js'

import '../../style/index.less'

require('safe')(React, {
    errorHandler: function () {
        // console.log(errReport);
    }
})

ReactDOM.render(
    <Provider store={store()}>
        <Routes>
            <Domstress />
        </Routes>
    </Provider>,
    document.getElementById('container')
)
