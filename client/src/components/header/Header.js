import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Header.css";
import logo from "./typr-logo-white-200x200.png";
import { fetchUser, logoutUser } from "../../actions"

import React, { Component } from "react";

class Header extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }
  
  onLogoutClick = event => {
    event.preventDefault();
    this.props.logoutUser()
  }

  renderLoginButton() {
    return (
      <Link to="/login">
        <button className="ui button basic inverted"
        onClick={this.removeFocus}>
          Log In
        </button>
      </Link>
    )
  }
  
  renderRegisterButton() {
    return (
      <Link to="/register">
        <button className="ui button basic inverted">
          Register
        </button>
      </Link>
    )
  }

  renderLogoutButton() {
    return (
      <button 
        className="ui button basic inverted"
        onClick={this.props.logoutUser}
      >
        Log Out
      </button>
    )
  }
  
  renderContent() {
    switch (this.props.auth.isAuthenticated) {
      case null:
        return;
      case false:
        return (
          <div>
            {this.renderRegisterButton()}
            {this.renderLoginButton()}
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
              <span>Logged in as {this.props.auth.user.name} </span>
                {this.renderLogoutButton()}
            </div>
          </div>
        );
    }
  }
  
  render() {

    return (
      <div className="headerBox">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="logoTopLeft" />
        </Link>
        <div style={{ float: "right" }}>{this.renderContent()}</div>
      </div>
    );
  }

}
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  {
     logoutUser,
     fetchUser
  }
)(Header);
