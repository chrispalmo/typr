import { FETCH_NEWS_SOURCES } from "../actions/types";

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_NEWS_SOURCES:
			return action.payload;
		default:
			return state;
	}
}
