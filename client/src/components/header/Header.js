import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "./typr-logo-white-200x200.png";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div>
            <a href="/auth/google">Google</a>
            <button className="ui button basic inverted">Sign In</button>
            <button className="ui button basic inverted">Register</button>
          </div>
        );
      default:
        //return an array of elements
        return (
          <div>
            <div>
              <div>
                Logged in as {this.props.auth.displayName}
                <button className="ui button basic inverted iconButton">
                  <i className="bars icon" />
                </button>
              </div>
            </div>
          </div>
        );
    }
  }

  render() {
    return (
      <div className="headerBox">
        <Link to={this.props.auth ? "/dashboard" : "/"}>
          <img size="small" src={logo} className="logoTopLeft" />
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
              <div>
                Logged in as {this.props.auth.displayName}
                <i className="bars icon" />
              </div>
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
