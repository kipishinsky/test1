import React, {useState} from 'react'

import {useDispatch, useSelector} from 'react-redux'
import {addNewsUserTC, approwedPostTC, deletePost, setTerm} from '../bll/rootReducer'

import s from './News.module.scss'

export function News() {

	const news = useSelector(state => state.root.news)
	const term = useSelector(state => state.root.term)
	const name = useSelector(state => state.root.userInfo)
	const dispatch = useDispatch()

	const [blockState, setBlockState] = useState({
		term: ''
	})
	const search = (items, term) => {
		if (term.length === '') {
			debugger
			return items
		}
		return items.filter((item) => {
			return item.name.toLowerCase().indexOf(term) > -1
		})
	}
	const visibleNews = search(news, term)
	const onSearchChange = (e) => {
		const term = e.target.value
		setBlockState({term})
		dispatch(setTerm(term))
	}


	// admin
	const deleteItem = (id) => {
		dispatch(deletePost(id))
	}

	const approveNews = (id) => {
		debugger
		dispatch(approwedPostTC(id, true))
	}


	// user
	const [nameNews, setNameNews] = useState({
		name: ''
	})
	const [titleNews, setTitleNews] = useState({
		title: ''
	})
	const [dataNews, setDataNews] = useState({
		data: ''
	})

	const valueNameNews = (e) => {
		const name = e.target.value
		setNameNews(name)
	}

	const valueTitleNews = (e) => {
		const title = e.target.value
		setTitleNews(title)
	}

	const valueDataNews = (e) => {
		const data = e.target.value
		setDataNews(data)
	}

	const addNewsButton = () => {
		debugger
		dispatch(addNewsUserTC(nameNews, titleNews, dataNews, false))
		setNameNews({name: ''})
		setTitleNews({title: ''})
		setDataNews({data: ''})
	}




	// admin
	if (name.userRoot && name.licence) {
		const elements = visibleNews.map((item) => {
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
	} else if (!name.userRoot && name.licence) {
		const elements = visibleNews.map((item) => {
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

		const newsGuest = news.filter( i => i.approved)

		const elements = newsGuest.map((item) => {
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
