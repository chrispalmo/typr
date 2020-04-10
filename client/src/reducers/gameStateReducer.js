import {
	SET_CAPS_LOCK_STATUS,
} from "../actions/types";

const initialState = {
	capsLockOn: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		//
		case SET_CAPS_LOCK_STATUS:
			return { ...state, capsLockOn: action.payload };
		//
		default:
			return state;
	}
}
