import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import {
	fetchNewsSources,
	fetchUser,
	toggleNewsSource,
	saveUser
} from "../../actions";

import "./NewsSelect.css";

class NewsSelect extends Component {
	componentDidMount() {
		this.props.fetchNewsSources({ language: "en" });
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="newsSelect">
				{this.renderHeader()}
				<div className="newsSelectListWrapper">{this.renderSourceList()}</div>
			</div>
		);
	}

	renderHeader() {
		return (
			<div className="newsSelectButtonHeader">
				<button
					className="ui button"
					style={{ marginLeft: "0px!important" }}
					onClick={() => this.props.saveUser(this.props.auth)}
				>
					<i className="chevron circle left icon" />
					{"	 "}Save and return
				</button>
				<hr />
				{this.renderSelectedList()}
				<hr style={{ margin: "0px" }} />
			</div>
		);
	}

	renderSelectedList() {
		if (!this.props.auth) {
			return <div> Loading user settings...</div>;
		}
		const selectedSources = [];
		this.props.auth.newsDigest.selectedSources.forEach(source => {
			selectedSources.push(
				<div
					key={source}
					className="ui label"
					onClick={() => this.props.toggleNewsSource(source)}
				>
					{source} <i className="icon close" />
				</div>
			);
		});
		return <div className="ui yellow labels">{selectedSources}</div>;
	}

	renderSourceList() {
		if (!this.props.newsSources || !this.props.auth) {
			return <div> Loading news sources...</div>;
		}
		const sources = [];
		_.toPairs(this.props.newsSources.sources).forEach(source => {
			sources.push(
				<div
					className={
						this.props.auth.newsDigest.selectedSources.includes(source[1].id)
							? "source checked"
							: "source"
					}
					key={source[1].id}
					onClick={() => this.props.toggleNewsSource(source[1].id)}
				>
					<div className="divider" />
					<h5>
						<p className="ui checkbox">
							<input
								type="checkbox"
								checked={
									this.props.auth.newsDigest.selectedSources.includes(
										source[1].id
									)
										? "checked"
										: ""
								}
							/>
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
	{ fetchNewsSources, fetchUser, toggleNewsSource, saveUser }
)(NewsSelect);
