import {
	SAVE_KEYLOG,
	ADD_LOCAL_EVENT_KEYLOG,
	CLEAR_KEYLOG
} from "../actions/types";

export default function(state = [], action) {

	switch (action.type) {
		case SAVE_KEYLOG:
			return state;
		case ADD_LOCAL_EVENT_KEYLOG:
			return [...state, action.payload];
		case CLEAR_KEYLOG:
			return [];
		default:
			return state;
	}
}
