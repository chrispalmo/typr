import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer"
import keylogReducer from "./keylogReducer";
import newsReducer from "./newsReducer";
import newsSourcesReducer from "./newsSourcesReducer";
import statsReducer from "./statsReducer";

export default combineReducers({
	auth: authReducer,
	newsSources: newsSourcesReducer,
	news: newsReducer,
	form: reduxForm,
	keylog: keylogReducer,
	stats: statsReducer,
	errors: errorsReducer
});
