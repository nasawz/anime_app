/**
 * create by nasa.wang
 */

import { combineReducers } from 'redux'

import ANIME from './anime.js'

export default function createReducer(asyncReducers) {
    return combineReducers({
        ANIME,
        ...asyncReducers
    })
}
