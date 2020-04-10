import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import keylogReducer from "./keylogReducer";
import newsReducer from "./newsReducer";
import newsSourcesReducer from "./newsSourcesReducer";
import statsReducer from "./statsReducer";
import flashMessageReducer from "./flashMessageReducer";
import gameStateReducer from "./gameStateReducer";

export default combineReducers({
	auth: authReducer,
	newsSources: newsSourcesReducer,
	news: newsReducer,
	keylog: keylogReducer,
	stats: statsReducer,
	errors: errorsReducer,
	flashMessage: flashMessageReducer,
	gameState: gameStateReducer,
});
