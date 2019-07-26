import {
	FETCH_DAILY_KEYLOG,
	SAVE_REMOTE_DAILY_KEYLOG,
	ADD_LOCAL_ENTRY_DAILY_KEYLOG
} from "../actions/types";

export default function(state = [], action) {
	//TODO: server-side -- use server date to group and analyse daily statistics
	/*
	https://www.compose.com/articles/understanding-dates-in-compose-mongodb/
	*/

	switch (action.type) {
		case FETCH_DAILY_KEYLOG:
		//TODO
		case SAVE_REMOTE_DAILY_KEYLOG:
		//TODO
		case ADD_LOCAL_ENTRY_DAILY_KEYLOG:
			return [...state, action.payload];
		default:
			return state;
	}
}
