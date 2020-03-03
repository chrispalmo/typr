import React, { Component } from "react";
import NewsSources from "../news/NewsSources";
import StatsDisplay from "../stats/StatsDisplay";
import history from "../../history";
import { connect } from "react-redux";

class Dashboard extends Component {

  render() {
	  if(this.props.auth.loading) {
	    return null
	  }
	  if (!this.props.auth.isAuthenticated) {
	  	history.push("/login")
	  }
	  return (
			<div
				className="ui one column centered grid middle aligned"
				style={{ height: "70vh" }}
			>
				<div>
					<NewsSources />
					<div> </div>
					<StatsDisplay />
				</div>
			</div>
		);
	};
  }

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps
)(Dashboard);
