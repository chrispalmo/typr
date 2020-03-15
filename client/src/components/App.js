import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import FlashMessage from "./flashmessage/FlashMessage"
import Header from "./header/Header";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./dashboard/Dashboard";
import NewsSelect from "./news/NewsSelect";
import TyprSessionContainer from "./typr/TyprSessionContainer";
import Debrief from "./news/Debrief"

import history from "../history";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    document.addEventListener("keydown", (e)=> {
      this.props.clearFlashMessage
      // prevent space bar scrolling
      if (e.keyCode === 32 && e.target === document.body) {
        e.preventDefault();
      }
    });
    document.addEventListener("mousedown", this.props.clearFlashMessage);


  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.props.clearFlashMessage);
    document.removeEventListener("mousedown", this.props.clearFlashMessage);
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
            <div style={{ margin: "10px" }}>
              <FlashMessage />
            </div>
            <div style={{ margin: "10px" }}>{this.renderProtectedRoutes()}</div>
          </div>
        </Router>
      </div>
    );
  }

  renderProtectedRoutes() {
    if(this.props.auth.loading) {
      return null
    }
    if (this.props.auth.isAuthenticated) {
      return (
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/content/news-select" component={NewsSelect} />
          <Route path="/app" component={TyprSessionContainer} />
          <Route path="/debrief" component={Debrief} />
          <Route component={Dashboard} />;
        </Switch>
      );
    }
    return (
    <Switch>
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      <Route component={RegisterPage} />
    </Switch>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  actions
)(App);
