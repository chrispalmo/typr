import { createBrowserHistory } from "history";
//"history" is one of the (automatically installed) package dependencies for react-router-dom.

/*
Amended import in response to below warning:

index.js:1446 Warning: Please use `require("history").createBrowserHistory` instead of `require("history/createBrowserHistory")`. Support for the latter will be removed in the next major release
*/

export default createBrowserHistory();
