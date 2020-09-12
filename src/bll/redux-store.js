import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {rootReducer} from './rootReducer'

let rootReducers = combineReducers({
	root: rootReducer,
})

export let store = createStore(rootReducers, applyMiddleware(thunkMiddleware))

window.store = store