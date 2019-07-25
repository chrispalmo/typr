import {
	FETCH_USER,
	TOGGLE_NEWS_SOURCE,
	SAVE_USER,
	FIRST_PARAGRAPH,
	PREV_PARAGRAPH,
	NEXT_PARAGRAPH
} from "../actions/types";

export default function(state = null, action) {
	switch (action.type) {
		//
		case FETCH_USER:
			return action.payload || false;
		//
		case TOGGLE_NEWS_SOURCE:
			const selectedSources = state.newsDigest.selectedSources;
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
				newsDigest: {
					...state.newsDigest,
					selectedSources: new_selectedSources
				}
			};
		//
		case FIRST_PARAGRAPH:
			return {
				...state,
				newsDigest: {
					...state.newsDigest,
					currentPosition: 0
				}
			};
		//
		case PREV_PARAGRAPH:
			if (state.newsDigest.currentPosition === 0) {
				return state;
			}
			return {
				...state,
				newsDigest: {
					...state.newsDigest,
					currentPosition: state.newsDigest.currentPosition - 1
				}
			};
		//
		case NEXT_PARAGRAPH:
			console.log(
				"state.newsDigest.currentPosition === " +
					state.newsDigest.currentPosition
			);
			if (state.newsDigest.currentPosition === action.payload - 1) {
				//  TODO: Implement session summary stats overview
				console.log("END OF CHAPTER!");
				return state;
			}
			return {
				...state,
				newsDigest: {
					...state.newsDigest,
					currentPosition: state.newsDigest.currentPosition + 1
				}
			};
		//
		case SAVE_USER:
			return action.payload;
		//
		default:
			return state;
	}
}
