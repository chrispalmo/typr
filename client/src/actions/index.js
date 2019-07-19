import axios from "axios";
import history from "../history";
import {
	FETCH_USER,
	FETCH_NEWS_SOURCES,
	TOGGLE_NEWS_SOURCE,
	SAVE_USER
} from "./types";

// !!!
// Ensure for all paths below, client/package.json is updated to include a proxy that forwards the requests to the backend server so the app still works in development when there are actually 2x different servers running at different domains.
//
//more info in OneNote under "udemy-node-react-fullstack: 05 Dev vs Prod Environments"
// !!!

export const fetchNewsSources = queryObject => async dispatch => {
	const res = await axios.post("/api/content/news/sources", queryObject);

	dispatch({ type: FETCH_NEWS_SOURCES, payload: res.data });
};

export const fetchUser = () => async dispatch => {
	const res = await axios.get("/api/current_user");

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const toggleNewsSource = source => dispatch => {
	dispatch({ type: TOGGLE_NEWS_SOURCE, payload: source });
};

export const saveUser = user => async dispatch => {
	const res = await axios.post("/api/current_user/", user);

	dispatch({ type: SAVE_USER, payload: res.data });

	//programmatically navigate back to root route "/" page after successfully saving the user
	history.push("/");
};
