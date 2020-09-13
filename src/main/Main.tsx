import React from 'react'
import s from './Main.module.scss'
import { useSelector} from 'react-redux'
import {RootStateType} from '../bll/redux-store'

export function Main() {

	const license = useSelector<RootStateType>( state => state.userInfo.licence )
	const name = useSelector<RootStateType>( state => state.userInfo.userName )

	return (
		<div className={s.root}>
			<div className={s.text}>
				{license ? `Привет, ${name}` : `Привет, Гость`}
			</div>
		</div>
	)
}




