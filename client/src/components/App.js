import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./header/Header";
import LandingPage from "./landing/LandingPage";
import Dashboard from "./dashboard/Dashboard";
import NewsSelect from "./news/NewsSelect";
import history from "../history";
/*
BrowserRouter> creates its own history instance, and listens for changes on that. So we use Router and nominate our own history object that can be manipulated.
*/

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <div
            style={{
              paddingTop: "4em"
            }}
          >
            <Header />
            <div style={{ margin: "10px" }}>{this.renderProtectedRoutes()}</div>
          </div>
        </Router>
      </div>
    );
  }

  renderProtectedRoutes() {
    if (this.props.auth) {
      return (
        <div>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/content/news-select" component={NewsSelect} />
        </div>
      );
    }
    return <Route exact path="/" component={LandingPage} />;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  actions
)(App);
