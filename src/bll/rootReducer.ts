import {v1} from 'uuid'
import {Dispatch} from 'redux'

const initialState: initialStateType = {

	userInfo: {
		userName: '',
		userPass: '',
		userRoot: false,
		licence: false
	},
	news: [
		{
			id: '1',
			name: 'Trump invoked Churchill and Roosevelt at a rally',
			title: `Trump ridiculously invoked the former British Prime Minister Winston Churchill 
				and the President Franklin Delano Roosevelt at a Thursday night rally, 
				claiming that like them, he had tried hard to calm public panic in a dark hour. 
				It was a historically illiterate gambit, since unlike Trump in the pandemic, 
				both statesmen leveled with their people about grave national crises.`,
			data: '11.09.2020',
			approved: false
		},
		{
			id: '2',
			name: 'Serena Williams beaten at US Open',
			title: `Blown away in the first set by Williams' serves and powerful, accurate drives, 
						Azarenka rallied for a 1-6 6-3 6-3 victory as the women's semifinals in New York hit lofty heights.`,
			data: '12.09.2020',
			approved: true
		},
		{
			id: '3',
			name: 'luxury remote working package',
			title: `This might read like an over-imaginative wish list from a frustrated remote worker, 
				but a luxury resort in the Maldives has just launched a 
				"Workation Package," with all of these benefits and more.`,
			data: '13.09.2020',
			approved: true
		}
	],
	term: ''
}

export const setUser = (name: string, pass: string, license: boolean, userRoot: boolean) => ({type: 'SET_USER', name, pass, license, userRoot}) as const
export const logOut = (license: boolean, userRoot: boolean) => ({type: 'LOGOUT', license, userRoot}) as const
export const addNewsUser = (name: string, title: string, data: string, approved: boolean) => ({type: 'ADD_NEWS_USER', name, title, data, approved}) as const
export const setTerm = (term: string) => ({type: 'SEARCH', term}) as const
export const deletePost = (id: string) => ({type: 'DELETE', id}) as const
export const approwedPost = (id: string, approved: boolean) => ({type: 'APPROWED', id, approved}) as const

export const rootReducer = (state: initialStateType = initialState , action: ActionType): initialStateType  => {

	switch (action.type) {
		case 'SET_USER': {
			return {...state, userInfo: {
					...state.userInfo,
					userName: action.name,
					userPass: action.pass,
					licence: action.license,
					userRoot: action.userRoot
				}
			}
		}
		case 'LOGOUT': {
			return {...state, userInfo: {
					...state.userInfo,
					licence: action.license,
					userRoot: action.userRoot
				}
			}
		}
		case 'ADD_NEWS_USER': {
			return {...state, news: [...state.news, {
					id: v1(),
					name: action.name,
					title: action.title,
					data: action.data,
					approved: action.approved
				}]
			}
		}
		case 'SEARCH': {
			return {...state, term: action.term}
		}
		case 'DELETE': {
			const newNews = state.news.filter(i => i.id !== action.id)
			return {...state, news: newNews}

		}
		case 'APPROWED': {
			const changeNews = state.news.map(t => t.id === action.id ? {...t, approved: action.approved} : t)
			return { ...state, news: changeNews}
		}
		default:
			return state
	}
}

export const loginTC = (login: string, password: string, license: boolean, userRoot: boolean) => (dispatch: Dispatch<ActionType>) => {
	dispatch(setUser(login, password, license, userRoot))
}
export const logOutTC = (license: boolean, userRoot: boolean) => (dispatch: Dispatch<ActionType>) => {
	dispatch(logOut(license, userRoot))
}

export const addNewsUserTC = (name: string, title:  string, data:  string, approved: boolean) => (dispatch: Dispatch<ActionType>) => {
	dispatch(addNewsUser(name, title, data, approved))
}
export const approwedPostTC = (id: string, approved: boolean) => (dispatch: Dispatch<ActionType>) => {
	dispatch(approwedPost(id, approved))
}


export interface NewType {
	id: string,
	name: string,
	title: string,
	data: string,
	approved: boolean
}

export interface initialStateType {
	userInfo: {
		userName: string,
		userPass: string,
		userRoot: boolean,
		licence: boolean
	},
	news: Array<NewType>,
	term: string
}

type ActionType =
	| ReturnType<typeof setUser>
	| ReturnType<typeof logOut>
	| ReturnType<typeof addNewsUser>
	| ReturnType<typeof setTerm>
	| ReturnType<typeof deletePost>
	| ReturnType<typeof approwedPost>
