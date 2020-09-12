import React from 'react'
import s from './Main.module.scss'
import { useSelector} from 'react-redux'

/*type MainType = {
	license: string,
	name: string
}*/

export function Main() {

	const license = useSelector( state=> state.root.userInfo.licence )
	const name = useSelector( state=> state.root.userInfo.userName )

	return (
		<div className={s.root}>
			<div className={s.text}>
				{license ? `Привет, ${name}` : `Привет, Гость`}
			</div>
		</div>
	)
}




