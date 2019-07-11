import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import LandingPage from "./landing/LandingPage";
import Dashboard from "./dashboard/Dashboard";
import NewsSources from "./news/NewsSources";
import NewsSourcesForm from "./news/NewsSourcesForm";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/content/news-sources" component={NewsSources} />
            <Route
              path="/content/news-sources-form"
              component={NewsSourcesForm}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
