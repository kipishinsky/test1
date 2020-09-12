import React from 'react'

import {useFormik} from 'formik'
import {useDispatch} from 'react-redux'
import {loginTC, logOut, logOutTC} from '../bll/rootReducer'

import s from './Login.module.scss'
import Modal from '@material-ui/core/Modal'

// подсветка индикации ошибки красным
// попап

export const Login = () => {
	const dispatch = useDispatch()

	const [open, setOpen] = React.useState(false)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}


	const formik = useFormik({
		initialValues: {
			login: '',
			password: ''
		},
		onSubmit: values => {
			if (values.login === 'admin' && values.password === '123') {
				dispatch(loginTC(values.login, values.password, true, true))
			}
			if (values.login === 'user' && values.password === '321') {
				dispatch(loginTC(values.login, values.password, true, false))
			}
		}
	})

	const LogOut = () => {
		dispatch(logOutTC( false, false))
	}

	return (
		<div className={s.root}>
			<div className={s.openModal}>
				<button className={s.login} onClick={handleOpen}>Вход</button>
				<button className={s.logout} onClick={LogOut}>Выход</button>
			</div>
			<Modal open={open}
			       onClose={handleClose}
			       aria-labelledby="simple-modal-title"
			       aria-describedby="simple-modal-description">
				{<>
					<form className={s.loginBox} onSubmit={formik.handleSubmit}>
						<h1 className={s.text}>Login</h1>
						<div className={s.text}>login admin: admin <br/> login user: user</div>
						<div className={s.text}>password admin: 123 <br/> password user: 321</div>
						<input
							name="login"
							type="login"
							onChange={formik.handleChange}
							value={formik.values.login}
							placeholder="username"
						/>
						<input
							name="password"
							type="password"
							onChange={formik.handleChange}
							value={formik.values.password}
							placeholder="password"
						/>
						<button type='submit'>Sing in</button>
					</form>
				</>}
			</Modal>
		</div>
	)

}


