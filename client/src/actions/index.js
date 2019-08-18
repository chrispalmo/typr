import axios from "axios";
import history from "../history";
import {
	FETCH_USER,
	SAVE_USER,
	CLEAR_NEWS,
	FETCH_NEWS,
	FETCH_NEWS_SOURCES,
	TOGGLE_NEWS_SOURCE,
	FIRST_PARAGRAPH,
	NEXT_PARAGRAPH,
	PREV_PARAGRAPH,
	FETCH_KEYLOG,
	SAVE_KEYLOG,
	ADD_LOCAL_EVENT_KEYLOG,
	FETCH_STATS_ALLTIME
} from "./types";

// !!!
// Ensure for all paths below, client/package.json is updated to include a proxy that forwards the rlquests to the backend server so the app still works in development when there are actually 2x different servers running at different domains.
//
//more info in OneNote under "udemy-node-react-fullstack: 05 Dev vs Prod Environments"
// !!!

export const fetchUser = () => async dispatch => {
	const res = await axios.get("/api/current_user");

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const saveUser = user => async dispatch => {
	const res = await axios.post("/api/current_user/", user);

	dispatch({ type: SAVE_USER, payload: res.data });

	//programmatically navigate back to root route "/" page after successfully saving the user
	history.push("/");
};

//News Actions
export const fetchNewsSources = queryObject => async dispatch => {
	const res = await axios.post("/api/content/news/sources", queryObject);

	dispatch({ type: FETCH_NEWS_SOURCES, payload: res.data });
};

export const clearNews = () => dispatch => {
	dispatch({ type: CLEAR_NEWS });
};

export const fetchNews = queryObject => async dispatch => {
	const res = await axios.get("/api/content/news/", queryObject);
	dispatch({ type: FETCH_NEWS, payload: res.data });
};

export const toggleNewsSource = source => dispatch => {
	dispatch({ type: TOGGLE_NEWS_SOURCE, payload: source });
};

//Navigation throughout newsfeed or book chapter
export const firstParagraph = () => dispatch => {
	dispatch({ type: FIRST_PARAGRAPH });
};

export const prevParagraph = () => dispatch => {
	dispatch({ type: PREV_PARAGRAPH });
};

export const nextParagraph = numberOfParagraphs => dispatch => {
	dispatch({ type: NEXT_PARAGRAPH, payload: numberOfParagraphs });
};

//Keylog Actions
export const addLocalEventKeylog = keyDataEntry => dispatch => {
	dispatch({ type: ADD_LOCAL_EVENT_KEYLOG, payload: keyDataEntry });
};

export const saveKeylog = keylog => async dispatch => {
	const res = await axios.post("/api/keylog", keylog);
	// dispatch({ type: SAVE_KEYLOG, payload: res.data });
	dispatch({ type: SAVE_KEYLOG });
};

//TODO: delete fetchKeyLog and associated actions
export const fetchKeylog = () => async dispatch => {
	const res = await axios.GET("/api/keylog");

	dispatch({ type: FETCH_KEYLOG, payload: res.data });
};

//Statistics Actions
export const fetchStatsAlltime = () => async dispatch => {
	const res = await axios.get("/api/keylog/stats/alltime");
	dispatch({ type: FETCH_STATS_ALLTIME, payload: res.data });
};
