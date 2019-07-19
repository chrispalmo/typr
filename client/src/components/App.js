import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./header/Header";
import LandingPage from "./landing/LandingPage";
import Dashboard from "./dashboard/Dashboard";
import NewsSelect from "./news/NewsSelect";
import history from "../history";

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
              paddingTop: "2em"
            }}
          >
            <Header />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/content/news-select" component={NewsSelect} />
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
