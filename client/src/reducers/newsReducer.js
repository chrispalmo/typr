import { FETCH_NEWS, CLEAR_NEWS } from "../actions/types";

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_NEWS:
			return action.payload;
		case CLEAR_NEWS:
			return null;
		default:
			return state;
	}
}
