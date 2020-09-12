import React from 'react'
import s from './Main.module.scss'
import { useSelector} from 'react-redux'
import {RootStateType} from '../bll/redux-store'


export function Main() {
// @ts-ignore
	const license = useSelector<RootStateType>( state => state.root.userInfo.licence )
	// @ts-ignore
	const name = useSelector( state => state.root.userInfo.userName )

	return (
		<div className={s.root}>
			<div className={s.text}>
				{license ? `Привет, ${name}` : `Привет, Гость`}
			</div>
		</div>
	)
}




