import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

import {App} from './app/App'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {store} from './bll/redux-store'

import './index.css'

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App/>
		</Provider>
	</BrowserRouter>, document.getElementById('root')
)

serviceWorker.unregister()
