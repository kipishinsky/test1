import {applyMiddleware, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {rootReducer} from './rootReducer'

export type RootStateType = ReturnType <typeof rootReducer>

export let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

//@ts-ignore
window.store = store