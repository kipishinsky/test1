import React, {ChangeEvent, useState} from 'react'

import {useDispatch, useSelector} from 'react-redux'
import {
	addNewsUserTC,
	approwedPostTC,
	deletePost,
	NewType,
	setTerm,
	UserInfo
} from '../bll/rootReducer'

import s from './News.module.scss'
import {RootStateType} from '../bll/redux-store'

export interface valueType {
	[key:string]: string
}

export function News() {

	const news = useSelector<RootStateType, Array<NewType>>(state => state.news)
	const term = useSelector<RootStateType, string>(state => state.term)
	const name = useSelector<RootStateType, UserInfo>(state => state.userInfo)

	const dispatch = useDispatch()

	const [blockState, setBlockState] = useState<valueType>({
		term: ''
	})

	const search = (items: Array<NewType>, term: string) => {

		if (term.length === 0) {
			return items
		}

		return items.filter((item) => {
			return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1
		})
	}

	const visibleNews = search(news, term)

	const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		const term = e.target.value
		setBlockState({term})
		dispatch(setTerm(term))
	}


	// admin
	const deleteItem = (id: string) => {
		dispatch(deletePost(id))
	}

	const approveNews = (id: string) => {
		debugger
		dispatch(approwedPostTC(id, true))
	}


	// user
	const [nameNews, setNameNews] = useState<valueType>({
		name: ''
	})
	const [titleNews, setTitleNews] = useState<valueType>({
		title: ''
	})
	const [dataNews, setDataNews] = useState<valueType>({
		data: ''
	})

	const valueNameNews = (e: ChangeEvent<HTMLInputElement>) => {
		const name = e.target.value
		setNameNews({name})
	}

	const valueTitleNews = (e: ChangeEvent<HTMLInputElement>) => {
		const title = e.target.value
		setTitleNews({title})
	}

	const valueDataNews = (e: ChangeEvent<HTMLInputElement>) => {
		const data = e.target.value
		setDataNews({data})
	}

	const addNewsButton = () => {
		dispatch(addNewsUserTC(nameNews, titleNews, dataNews, false))
		setNameNews({name: ''})
		setTitleNews({title: ''})
		setDataNews({data: ''})
	}

	// admin
	if (name.userRoot && name.licence) {
		const elements = visibleNews.map((item: NewType) => {
			return (
				<div className={s.items} key={item.id}>
					<div className={s.itemName}>
						<h1>{item.name}</h1>
					</div>
					<div className={s.item}>
						{item.title}
					</div>
					<div className={s.itemData}>
						{item.data}
					</div>
					<button onClick={() => {
						deleteItem(item.id)
					}}>Удалить новость
					</button>
					<button onClick={() => {approveNews(item.id)}}>Одобрить новость</button>
				</div>
			)
		})

		return <div className={s.root}>
			<input type="text"
			       className={s.form}
			       placeholder="поиск по новостям"
			       value={blockState.term}
			       onChange={onSearchChange}/>
			<div>
				{elements}
			</div>
		</div>

	//user
	} else {
		if (!name.userRoot && name.licence) {
				const elements = visibleNews.map((item: NewType) => {
					return (
						<div className={s.items} key={item.id}>
							<div className={s.itemName}>
								<h1>{item.name}</h1>
							</div>
							<div className={s.item}>
								{item.title}
							</div>
							<div className={s.itemData}>
								{item.data}
							</div>
						</div>
					)
				})

				return <div className={s.root}>
					<input type="text"
					       className={s.form}
					       placeholder="поиск по новостям"
					       value={blockState.term}
					       onChange={onSearchChange}/>
					<div>
						{elements}
					</div>

					<div className={s.addNews}>
						<h3>Предложить новость</h3>
						<input type="text"
						       className={s.inputAddNews}
						       placeholder="Заголовок"
						       value={nameNews.name}
						       onChange={valueNameNews}/>
						<input type="text"
						       className={s.inputAddNews}
						       placeholder="Описание"
						       value={titleNews.title}
						       onChange={valueTitleNews}/>
						<input type="text"
						       className={s.inputAddNews}
						       placeholder="Дата: формат(01.01.2020)"
						       value={dataNews.data}
						       onChange={valueDataNews}/>
						<button onClick={addNewsButton} className={s.btnAddNews}>Предложить новость</button>
					</div>

				</div>


				//guest
			} else {

			const newsGuest = news.filter( (i: NewType) => i.approved)

				const elements = newsGuest.map((item: NewType) => {
					return (
						<div className={s.items} key={item.id}>
							<div className={s.itemName}>
								<h1>{item.name}</h1>
							</div>

							<div className={s.item}>
								{item.title}
							</div>
							<div className={s.itemData}>
								{item.data}
							</div>
						</div>
					)
				})

				return <div className={s.root}>
					<div>
						{elements}
					</div>
				</div>
			}
	}
}


