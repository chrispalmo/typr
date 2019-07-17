import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchNewsSources, fetchUser } from "../../actions";

import "./NewsSelect.css";

class NewsSelect extends Component {
	componentDidMount() {
		this.props.fetchNewsSources({ language: "en" });
		this.props.fetchUser();
	}

	render() {
		return (
			<div>
				<div className="newsSelectButtonHeader">
					<button className="ui yellow button">
						<i className="chevron circle left icon" />
						{"	 "}Save and return
					</button>
					<hr />
				</div>
				<div className="newsSelectListWrapper">{this.renderList()}</div>
			</div>
		);
	}

	renderList() {
		const newsSources = this.props.newsSources;
		if (!newsSources) {
			return <div> Loading news sources...</div>;
		}
		const sources = [];
		_.toPairs(this.props.newsSources.sources).forEach(source => {
			sources.push(
				<div>
					<div key={source[1].id} className="divider" />
					<h5>
						<p className="ui checkbox">
							<input type="checkbox" checked="checked" />
							<label>{source[1].name}</label>
						</p>
					</h5>
					<p>{source[1].description}</p>
				</div>
			);
		});
		return sources;
	}
}

const mapStateToProps = state => {
	return { newsSources: state.newsSources, auth: state.auth };
};

export default connect(
	mapStateToProps,
	{ fetchNewsSources, fetchUser }
)(NewsSelect);
