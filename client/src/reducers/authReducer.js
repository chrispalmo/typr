import { FETCH_USER, TOGGLE_NEWS_SOURCE, SAVE_USER } from "../actions/types";

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_USER:
			return action.payload || false;
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
		case SAVE_USER:
			return action.payload;

		default:
			return state;
	}
}
