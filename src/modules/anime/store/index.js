/**
 * create by nasa.wang
 */
// import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import createReducer from '../reducers'

// const middleware = process.env.NODE_ENV === '__PROD__' ? [thunk] : [thunk, logger()]
const middleware = [thunk]

export default function configureStore() {
    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
    let store = createStoreWithMiddleware(createReducer())
    store.asyncReducers = {}
    return store
}

export function injectAsyncReducer(store, name, asyncReducer) {
    store.asyncReducers[name] = asyncReducer
    store.replaceReducer(createReducer(store.asyncReducers))
}
