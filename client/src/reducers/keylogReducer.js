import {
	SAVE_KEYLOG,
	ADD_LOCAL_EVENT_KEYLOG
} from "../actions/types";

export default function(state = [], action) {

	switch (action.type) {
		case SAVE_KEYLOG:
			return state;
		case ADD_LOCAL_EVENT_KEYLOG:
			return [...state, action.payload];
		default:
			return state;
	}
}
