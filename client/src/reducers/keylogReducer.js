import {
	SAVE_KEYLOG,
	FETCH_KEYLOG,
	ADD_LOCAL_EVENT_KEYLOG
} from "../actions/types";

export default function(state = [], action) {
	//TODO: server-side -- use server date to group and analyse daily statistics
	/*
	https://www.compose.com/articles/understanding-dates-in-compose-mongodb/
	*/

	switch (action.type) {
		case FETCH_KEYLOG:
			console.log("to be implemented");
			return state;
		case SAVE_KEYLOG:
			return state;
		case ADD_LOCAL_EVENT_KEYLOG:
			return [...state, action.payload];
		default:
			return state;
	}
}
