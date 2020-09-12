import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {rootReducer} from './rootReducer'

let rootReducers = combineReducers({
	root: rootReducer
})

export type RootStateType = ReturnType <typeof rootReducer>

export let store = createStore(rootReducers, applyMiddleware(thunkMiddleware))


//@ts-ignore
window.store = store