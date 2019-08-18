import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import newsSourcesReducer from "./newsSourcesReducer";
import newsReducer from "./newsReducer";
import keylogReducer from "./keylogReducer";
import statsReducer from "./statsReducer";

export default combineReducers({
	auth: authReducer,
	newsSources: newsSourcesReducer,
	news: newsReducer,
	form: reduxForm,
	keylog: keylogReducer,
	stats: statsReducer
});
