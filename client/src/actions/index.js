import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import history from "../history";

import {
	SAVE_SELECTED_SOURCES,
	GET_ERRORS,
	USER_LOADING,
	SET_CURRENT_USER,
	SET_FLASH_MESSAGE,
	CLEAR_FLASH_MESSAGE,
	CLEAR_NEWS,
	FETCH_NEWS,
	FETCH_NEWS_SOURCES,
	TOGGLE_NEWS_SOURCE,
	FIRST_PARAGRAPH,
	NEXT_PARAGRAPH,
	PREV_PARAGRAPH,
	ADD_LOCAL_EVENT_KEYLOG,
	CLEAR_KEYLOG,
	FETCH_SESSION_STATS,
	SET_CAPS_LOCK_STATUS,
} from "./types";

/*
Ensure for all paths below, client/package.json is updated to include a proxy that forwards the requests to the backend server so the app still works in development when there are 2x different servers running at different domains.
*/

export const registerUser = (userData, history) => (dispatch) => {
	axios
		.post("/api/user/register", userData)
		.then(() => {
			dispatch(
				setFlashMessage({
					type: "success",
					text:
						"Registraion of " +
						userData.email +
						" successful. You may now log in using your email and password.",
				})
			);
			history.push("/login");
		})
		.catch((err) => {
			dispatch(
				setFlashMessage({
					type: "negative",
					text:
						"Oops, there were some issues with the information provided.",
				})
			);
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

export const loginUser = (userData) => (dispatch) => {
	// Get user token
	axios
		.post("/api/user/login", userData)
		.then((res) => {
			// Save to localStorage
			// Set token to localStorage
			const { token } = res.data;
			localStorage.setItem("jwtToken", token);
			// Set token to Auth header
			setAuthToken(token);
			// Decode token to get user data
			const decoded = jwt_decode(token);
			// Set current user
			dispatch(setCurrentUser(decoded));
			dispatch(
				setFlashMessage({
					type: "success",
					text: "Logged in as " + decoded.name + ".",
				})
			);
			history.push("/dashboard");
		})
		.catch((err) => {
			dispatch(
				setFlashMessage({
					type: "negative",
					text:
						"Oops, there were some issues with the information provided.",
				})
			);
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};

export const setUserLoading = () => {
	return {
		type: USER_LOADING,
	};
};

export const logoutUser = () => (dispatch) => {
	// Remove token from local storage
	localStorage.removeItem("jwtToken");
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to empty object {} which will set isAuthenticated to false
	dispatch(setCurrentUser(null));
	dispatch(
		setFlashMessage({
			type: "success", // "success" or "negative"
			text: "You have successfully logged out.",
		})
	);
	history.push("/login");
};

export const fetchUser = () => async (dispatch) => {
	// Check for existing token
	const token = localStorage.getItem("jwtToken");
	if (token) {
		try {
			// Set token to Auth header
			setAuthToken(token);
			const res = await axios.get("/api/user/current_user");
			if (res.data.message) {
				// An error will occur if the token is invalid.
				// If this happens, you may want to remove the invalid token.
				localStorage.removeItem("token");
				history.push("/login");
			} else {
				dispatch(setCurrentUser(res.data));
			}
		} catch (error) {
			console.log(error);
		}
	}
};

export const saveSelectedSources = (selected_sources) => async (dispatch) => {
	const res = await axios.post(
		"/api/current_user/news_digest/selected_sources",
		selected_sources
	);
	dispatch({ type: SAVE_SELECTED_SOURCES, payload: res.data });
	history.push("/");
};

export const setFlashMessage = (params) => (dispatch) => {
	dispatch({ type: SET_FLASH_MESSAGE, payload: params });
};

export const clearFlashMessage = () => (dispatch) => {
	dispatch({ type: CLEAR_FLASH_MESSAGE });
};

//News Actions
export const fetchNewsSources = (queryObject) => async (dispatch) => {
	const res = await axios.post("/api/content/news/sources", queryObject);

	dispatch({ type: FETCH_NEWS_SOURCES, payload: res.data });
};

export const clearNews = () => (dispatch) => {
	dispatch({ type: CLEAR_NEWS });
	fetchNews();
};

export const fetchNews = (queryObject) => async (dispatch) => {
	const res = await axios.get("/api/content/news/", queryObject);
	dispatch({ type: FETCH_NEWS, payload: res.data });
};

export const toggleNewsSource = (source) => (dispatch) => {
	dispatch({ type: TOGGLE_NEWS_SOURCE, payload: source });
};

//Navigation throughout newsfeed or book chapter
export const firstParagraph = () => (dispatch) => {
	dispatch({ type: FIRST_PARAGRAPH });
};

export const prevParagraph = () => (dispatch) => {
	dispatch({ type: PREV_PARAGRAPH });
};

export const nextParagraph = (numberOfParagraphs) => (dispatch) => {
	dispatch({ type: NEXT_PARAGRAPH, payload: numberOfParagraphs });
};

//Keylog Actions
export const addLocalEventKeylog = (keyDataEntry) => (dispatch) => {
	dispatch({ type: ADD_LOCAL_EVENT_KEYLOG, payload: keyDataEntry });
};

export const clearKeylog = () => (dispatch) => {
	dispatch({ type: CLEAR_KEYLOG });
};

//Statistics Actions
export const fetchSessionStats = () => async (dispatch) => {
	const res = await axios.get("/api/stats/sessions");
	dispatch({ type: FETCH_SESSION_STATS, payload: res.data });
};

export const saveSessionStats = (stats) => async (dispatch) => {
	const res = await axios.post("/api/stats/sessions", stats);
	dispatch({ type: FETCH_SESSION_STATS, payload: res.data });
};

//Misc Actions
export const setCapsLockStatus = (capsLockStatus) => (dispatch) => {
	dispatch({ type: SET_CAPS_LOCK_STATUS, payload: capsLockStatus });
};
