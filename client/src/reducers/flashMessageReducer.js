import { SET_FLASH_MESSAGE, CLEAR_FLASH_MESSAGE } from "../actions/types";

const initialState = {
	type: "", // "success" or "negative"
	text: "",
	hidden: true, // omit from action arguments
};

export default function (state = initialState, action) {
	switch (action.type) {
		//
		case SET_FLASH_MESSAGE:
			return action.payload;
		//
		case CLEAR_FLASH_MESSAGE:
			return initialState;
		//
		default:
			return state;
	}
}
