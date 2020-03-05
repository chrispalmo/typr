import {
	SET_CURRENT_USER,
	USER_LOADING,
	SAVE_SELECTED_SOURCES,
	TOGGLE_NEWS_SOURCE,
	FIRST_PARAGRAPH,
	PREV_PARAGRAPH,
	NEXT_PARAGRAPH
} from "../actions/types";

const isEmpty = require("is-empty");
const initialNewsDigestState = {
	selectedSources: [],
	numberOfArticles: null,
	currentPosition: 0
};
const initialState = {
	isAuthenticated: false,
	user: {
		name: "",
		email: "",
		date: "",
		newsDigest: initialNewsDigestState
	},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		//
		case SET_CURRENT_USER:
			if (!action.payload) return {...state, isAuthenticated: false}
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: {
					...state.user,
					name: action.payload.name,
					email: action.payload.email,
					date: action.payload.date,	
					newsDigest: action.payload.newsDigest
				}			
			};
		//
		case USER_LOADING:
			return {
				...state,
				loading: true
			};
		//
		case TOGGLE_NEWS_SOURCE:
			const selectedSources = state.user.newsDigest.selectedSources;
			let new_selectedSources;
			if (selectedSources.includes(action.payload)) {
				new_selectedSources = selectedSources.filter(
					item => item !== action.payload
				);
			} else {
				new_selectedSources = [...selectedSources, action.payload];
			}
			return {
				...state,
				user: {
					...state.user,
					newsDigest: {
						...state.user.newsDigest,
						selectedSources: new_selectedSources
					}
				}
			};
		//
		case FIRST_PARAGRAPH:
			return {
				...state,
				user: {
					...state.user,		
					newsDigest: {
						...state.user.newsDigest,
						currentPosition: 0
					}
				}
			};
		//
		case PREV_PARAGRAPH:
			if (state.newsDigest.currentPosition === 0) {
				return state;
			}
			return {
				...state,
				user: {
					...state.user,	
					newsDigest: {
						...state.user.newsDigest,
						currentPosition: state.user.newsDigest.currentPosition - 1
					}
				}
			};
		//
		case NEXT_PARAGRAPH:
			console.log(
				"state.newsDigest.currentPosition === " +
					state.user.newsDigest.currentPosition
			);
			if (state.user.newsDigest.currentPosition === action.payload - 1) {
				//  TODO: Implement session summary stats overview
				console.log("END OF CHAPTER!");
				return state;
			}
			return {
				...state,
				user: {
					...state.user,
					newsDigest: {
						...state.user.newsDigest,
						currentPosition: state.user.newsDigest.currentPosition + 1
					}
				}
			};
		//
		case SAVE_SELECTED_SOURCES:
			return {
				...state,
				user: {
					...state.user,
					newsDigest: {
						...state.user.newsDigest,
						selectedSources: action.payload
					}
				}
			};
		//
		default:
			return state;
	}
}
