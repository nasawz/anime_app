/**
 * create by nasa.wang
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'

import Routes from '../common/alone.jsx'
import Colors from './containers/colorsContainer.js'

import '../../style/index.less'

require('safe')(React, {
    errorHandler: function () {
        // console.log(errReport);
    }
})

ReactDOM.render(
    <Provider store={store()}>
        <Routes>
            <Colors />
        </Routes>
    </Provider>,
    document.getElementById('container')
)
