import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import {
	fetchUser,
	fetchNewsSources,
	toggleNewsSource,
	saveSelectedSources,
	fetchNews,
	clearNews
} from "../../actions";

import "./NewsSelect.css";

class NewsSelect extends Component {
	componentDidMount() {
		this.props.fetchNewsSources({ language: "en" });
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
					onClick={() => {
						this.props.saveSelectedSources(this.props.auth.user.newsDigest.selectedSources);
						this.props.clearNews();
					}}
				>
					<i className="chevron circle left icon" />
					{"	 "}Save and return
				</button>
				{this.renderSelectedNewsSources()}
			</div>
		);
	}

	renderSelectedNewsSources() {
		if (!this.props.auth.user) {
			return <div> Loading user settings...</div>;
		}

		const noSelectedSources =
			this.props.auth.user.newsDigest.selectedSources.length === 0;

		if (noSelectedSources) {
			return <div className="ui block header">Select news sources below</div>;
		}

		const selectedSources = [];
		this.props.auth.user.newsDigest.selectedSources.forEach(source => {
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
		return (
			<div className="ui block header">
				<div className="ui grey labels">{selectedSources}</div>
			</div>
		);
	}

	renderSourceList() {
		if (!this.props.newsSources || this.props.auth.loading) {
			const loadingLines = [];
			var i;
			for (i = 0; i < 20; i++) {
				loadingLines.push(
					<div className="ui placeholder">
						<div className="image header">
							<div className="line" />
							<div className="line" />
						</div>
						<div className="line" />
						<div className="line" />
					</div>
				);
			}
			return <div>{loadingLines}</div>;
		}
		const sources = [];
		_.toPairs(this.props.newsSources.sources).forEach(source => {
			sources.push(
				<div
					className={
						this.props.auth.user.newsDigest.selectedSources.includes(source[1].id)
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
									this.props.auth.user.newsDigest.selectedSources.includes(
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
	{
		fetchUser,
		fetchNewsSources,
		toggleNewsSource,
		saveSelectedSources,
		fetchNews,
		clearNews
	}
)(NewsSelect);
