/**
 * create by nasa.wang
 */

import { combineReducers } from 'redux'

import CSSTWEEN from './csstween.js'

export default function createReducer(asyncReducers) {
    return combineReducers({
        CSSTWEEN,
        ...asyncReducers
    })
}
