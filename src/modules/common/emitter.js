import {EventEmitter} from 'fbemitter'

let emitter = new EventEmitter()
emitter.setMaxListeners(100)

export default emitter
