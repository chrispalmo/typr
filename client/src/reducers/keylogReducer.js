import { ADD_LOCAL_EVENT_KEYLOG, CLEAR_KEYLOG } from "../actions/types";

export default function (state = [], action) {
	switch (action.type) {
		case ADD_LOCAL_EVENT_KEYLOG:
			return [...state, action.payload];
		case CLEAR_KEYLOG:
			return [];
		default:
			return state;
	}
}
