import React, { Component } from "react";
import NewsSources from "../news/NewsSources";
import StatsDisplay from "../stats/StatsDisplay";
import { connect } from "react-redux";

import "./Dashboard.css";

class Dashboard extends Component {
	render() {
		if (this.props.auth.loading) {
			return null;
		}
		return (
			<div 
				id="centeredComponentGrid"
				className="ui container"
			>
				<NewsSources />
				<div> </div>
				<StatsDisplay />
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Dashboard);
