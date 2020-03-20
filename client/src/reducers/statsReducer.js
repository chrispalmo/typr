import { FETCH_SESSION_STATS } from "../actions/types";

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_SESSION_STATS:
			return action.payload;
		default:
			return state;
	}
}
