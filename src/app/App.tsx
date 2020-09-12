import React from 'react'

import {Header} from '../header/Header'
import {News} from '../news/News'
import {Login} from '../login/Login'
import {Main} from '../main/Main'
import {Route} from "react-router-dom";

import s from './App.module.scss'

export function App() {
	return (
		<div className={s.app}>
			<Header />
			<Route path='/main' render={ () => <Main /> }/>
			<Route path='/news' render={ () => <News /> }/>
			<Route path='/login' render={ () => <Login/> }/>
		</div>
	)
}