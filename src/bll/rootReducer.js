import {v1} from 'uuid'

const SET_USER = 'SET_USER'
const LOGOUT = 'LOGOUT'
const ADD_NEWS_USER = 'ADD_NEWS_USER'
const SEARCH = 'SEARCH'
const DELETE = 'DELETE'
const APPROWED = 'APPROWED'


const initialState = {

	userInfo: {
		userName: '',
		userPass: '',
		userRoot: false,
		licence: false
	},
	news: [
		{
			id: 1,
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
			id: 2,
			name: 'Serena Williams beaten at US Open',
			title: `Blown away in the first set by Williams' serves and powerful, accurate drives, 
						Azarenka rallied for a 1-6 6-3 6-3 victory as the women's semifinals in New York hit lofty heights.`,
			data: '12.09.2020',
			approved: true
		},
		{
			id: 3,
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

export const setUser = (name, pass, license, userRoot) => ({type: SET_USER, name, pass, license, userRoot})
export const logOut = (license, userRoot) => ({type: LOGOUT, license, userRoot})
export const addNewsUser = (name, title, data, approved) => ({type: ADD_NEWS_USER, name, title, data, approved})
export const setTerm = (term) => ({type: SEARCH, term})
export const deletePost = (id) => ({type: DELETE, id})
export const approwedPost = (id, approved) => ({type: APPROWED, id, approved})



export const rootReducer = (state = initialState, action) => {

	switch (action.type) {
		case SET_USER: {
			return {...state, userInfo: {
					...state.userInfo,
					userName: action.name,
					userPass: action.pass,
					licence: action.license,
					userRoot: action.userRoot
				}
			}
		}
		case LOGOUT: {
			return {...state, userInfo: {
					...state.userInfo,
					licence: action.license,
					userRoot: action.userRoot
				}
			}
		}
		case ADD_NEWS_USER: {
			return {...state, news: [...state.news, {
					id: v1(),
					name: action.name,
					title: action.title,
					data: action.data,
					approved: action.approved
				}]
			}
		}
		case SEARCH: {
			return {...state, term: action.term}
		}
		case DELETE: {
			const newNews = state.news.filter(i => i.id !== action.id)
			return {...state, news: newNews}

		}
		case APPROWED: {
			const changeNews = state.news.map(t => t.id === action.id ? {...t, approved: action.approved} : t)
			return { ...state, news: changeNews}

		}
		default:
			return state
	}
}

export const loginTC = (login, password, license, userRoot) => (dispatch) => {
	dispatch(setUser(login, password, license, userRoot))
}
export const logOutTC = (license, userRoot) => (dispatch) => {
	dispatch(logOut(license, userRoot))
}


export const addNewsUserTC = (name, title, data, approved) => (dispatch) => {
	dispatch(addNewsUser(name, title, data, approved))
}
export const approwedPostTC = (id, approved) => (dispatch) => {
	dispatch(approwedPost(id, approved))
}
