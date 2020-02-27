import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Header.css";
import logo from "./typr-logo-white-200x200.png";
import { logoutUser } from "../../actions"

import React, { Component } from "react";

class Header extends Component {
  
  onLogoutClick = event => {
    event.preventDefault();
    this.props.logoutUser()
  };

  renderContent() {
    console.log(this.props.auth);
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div>
            <a href="/login">
              <button className="ui button basic inverted">Log In</button>
            </a>
          </div>
        );
      default:
        return (
          <div>
            <div
              style={{
                display: "table-cell",
                verticalAlign: "middle"
              }}
            >
              <span>Logged in as {this.props.auth.displayName + " "}</span>
              <a href="/api/logout">
                <button className="ui button basic inverted">Log Out</button>
              </a>
            </div>
          </div>
        );
    }
  }

  render() {
    return (
      <div className="headerBox">
        <Link to={this.props.auth ? "/dashboard" : "/"}>
          <img src={logo} alt="logo" className="logoTopLeft" />
        </Link>
        <div style={{ float: "right" }}>{this.renderContent()}</div>
      </div>
    );
  }

  renderContent1() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div style={{ textAlign: "right" }}>
            <a href="/auth/google">
              <button className="small ui inverted basic button">
                Sign In
              </button>
            </a>
          </div>
        );
      default:
        //return an array of elements
        return (
          <div>
            <div>
              <div>Logged in as {this.props.auth.displayName}</div>
            </div>
          </div>
        );
    }
  }

  render1() {
    return (
      <div>
        <div className="headerBox">
          <Link to={this.props.auth ? "/dashboard" : "/"} className="item">
            <img src={logo} alt="Logo" className="logoTopLeft" />
          </Link>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
