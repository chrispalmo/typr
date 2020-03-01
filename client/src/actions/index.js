import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import history from "../history";

import {
	FETCH_USER,
	SAVE_USER,
	GET_ERRORS,
	USER_LOADING,
	SET_CURRENT_USER,
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

/*
Ensure for all paths below, client/package.json is updated to include a proxy that forwards the requests to the backend server so the app still works in development when there are actually 2x different servers running at different domains.

more info in OneNote under "udemy-node-react-fullstack: 05 Dev vs Prod Environments"
*/

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/user/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = userData => dispatch => {
	// Get user token
  axios
    .post("/api/user/login", userData)
    .then(res => {
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
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};


export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const fetchUser = () => async dispatch => {
/*
	const res = await axios.get("/api/current_user");
	dispatch({ type: FETCH_USER, payload: res.data });
*/
	// Check for existing token
	const token = localStorage.getItem("jwtToken")
  if (token) {
	  try {
	  // Set token to Auth header
	  setAuthToken(token);
		// Decode token to get user data
		const decoded = jwt_decode(token);
		// Set current user
		dispatch(setCurrentUser(decoded));
		history.push("/dashboard")
		} 
		catch(error) {
  		console.log(error) 
		}
  } 
  else {
  	history.push("/register")
  }
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
