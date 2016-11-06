/**
 * create by nasa.wang
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'

import Routes from '../common/alone.jsx'
import Funcb from './containers/funcbContainer.js'

import '../../style/index.less'

require('safe')(React, {
    errorHandler: function () {
        // console.log(errReport);
    }
})

ReactDOM.render(
    <Provider store={store()}>
        <Routes>
            <Funcb />
        </Routes>
    </Provider>,
    document.getElementById('container')
)
