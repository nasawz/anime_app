/**
 * create by nasa.wang
 */

import { combineReducers } from 'redux'

import CSS3D from './css3d.js'

export default function createReducer(asyncReducers) {
    return combineReducers({
        CSS3D,
        ...asyncReducers
    })
}
