import React from 'react'
import s from './Header.module.scss'
import {NavLink} from 'react-router-dom'

export function Header() {
	return (
		<div className={s.root}>
			<NavLink to='/main' className={s.link}>Главная</NavLink>
			<NavLink to='/news' className={s.link}>Новости</NavLink>
			<NavLink to='/login' className={s.link}>Вход/Выход</NavLink>
		</div>
	)
}