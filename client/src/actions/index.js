import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";

// !!!
// Ensure for all paths below, client/package.json is updated to include a proxy that forwards the requests to the backend server so the app still works in development when there are actually 2x different servers running at different domains.
//
//more info in OneNote under "udemy-node-react-fullstack: 05 Dev vs Prod Environments"
// !!!

export const fetchUser = () => async dispatch => {
	const res = await axios.get("/api/current_user");

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
	const res = await axios.post("/api/stripe", token);

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
	const res = await axios.post("/api/surveys", values);

	history.push("/dashboard");
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
	const res = await axios.get("/api/surveys");

	dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
