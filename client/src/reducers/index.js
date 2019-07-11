import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import newsReducer from "./newsReducer";

export default combineReducers({
	auth: authReducer,
	news: newsReducer,
	form: reduxForm
});
