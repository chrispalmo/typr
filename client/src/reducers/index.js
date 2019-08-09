import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import newsSourcesReducer from "./newsSourcesReducer";
import newsReducer from "./newsReducer";
import keylogReducer from "./keylogReducer";

export default combineReducers({
	auth: authReducer,
	newsSources: newsSourcesReducer,
	news: newsReducer,
	form: reduxForm,
	keylog: keylogReducer
});
