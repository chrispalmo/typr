import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import newsSourcesReducer from "./newsSourcesReducer";
import newsReducer from "./newsReducer";
import dailyKeylogReducer from "./dailyKeylogReducer";

export default combineReducers({
	auth: authReducer,
	newsSources: newsSourcesReducer,
	news: newsReducer,
	form: reduxForm,
	keylog: dailyKeylogReducer
});
