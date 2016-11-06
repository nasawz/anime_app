/**
 * create by nasa.wang
 */

import { combineReducers } from 'redux'

import JSTWEEN from './jstween.js'

export default function createReducer(asyncReducers) {
    return combineReducers({
        JSTWEEN,
        ...asyncReducers
    })
}
