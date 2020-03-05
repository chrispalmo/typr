import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import "semantic-ui-css/semantic.min.css";

import App from "./components/App";
import reducers from "./reducers";
import axios from "axios";

let store
if (process.env.NODE_ENV === 'production') {
	store = createStore(
		reducers, 
		{},
		applyMiddleware(reduxThunk))
} else {
	window.axios = axios;
	
	//redux dev tools helper
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
	  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) || compose;

	store = createStore(
		reducers,
		composeEnhancers(applyMiddleware(reduxThunk))
	);
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector("#root")
);
