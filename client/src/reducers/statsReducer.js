import { FETCH_STATS_ALLTIME } from "../actions/types";

const defaultState = {
	allTime: null,
	daily: null
};

export default function(state = defaultState, action) {
	switch (action.type) {
		case FETCH_STATS_ALLTIME:
			return { ...state, allTime: action.payload };
		default:
			return state;
	}
}
