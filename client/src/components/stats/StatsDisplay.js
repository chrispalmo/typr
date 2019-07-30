import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser, fetchNewsSources, fetchNews } from "../../actions";
import history from "../../history";

class NewsSources extends Component {
	//pre-load before user navigates to news sources
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="ui compact segments">
				<div className="ui center aligned secondary segment">
					<span>
						<div className="ui icon header grey">Stats Overview</div>
					</span>
				</div>
				{this.renderStatOverview()}
			</div>
		);
	}

	renderStatOverview() {
		return (
			<div>
				<table className="ui very basic table" style={{ padding: "1em" }}>
					<thead>
						<tr>
							<th />
							<th>Today</th>
							<th>All Time</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Words:</td>
							<td className="center aligned">2,546</td>
							<td className="center aligned">32,577</td>
						</tr>
						<tr>
							<td>Characters:</td>
							<td className="center aligned">345,765</td>
							<td className="center aligned">435,7876</td>
						</tr>
						<tr>
							<td>WPM:</td>
							<td className="center aligned">85</td>
							<td className="center aligned">92</td>
						</tr>
						<tr>
							<td>Accuracy:</td>
							<td className="center aligned">77%</td>
							<td className="center aligned">85%</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	renderSelectedNewsSources() {
		if (!this.props.auth) {
			return (
				<div className="ui center aligned secondary segment">
					<div className="line" />
					<div className="line" />
					<div className="line" />
					<div className="line" />
				</div>
			);
		}

		const noSelectedSources =
			this.props.auth.newsDigest.selectedSources.length === 0;

		if (noSelectedSources) {
			return (
				<div className="ui centre aligned secondary segment">
					<div className="ui icon header grey">
						<i className="newspaper outline icon" />
						No news sources selected
					</div>
				</div>
			);
		}

		const selectedSources = [];
		this.props.auth.newsDigest.selectedSources.forEach(source => {
			selectedSources.push(
				<div
					key={source}
					className="ui label"
					onClick={() => history.push("/content/news-select")}
				>
					{source} <i className="icon" />
				</div>
			);
		});
		return (
			<div className="ui center aligned secondary segment">
				<div className="ui yellow labels">{selectedSources}</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { newsSources: state.newsSources, auth: state.auth, news: state.news };
};

export default connect(
	mapStateToProps,
	{ fetchUser, fetchNewsSources, fetchNews }
)(NewsSources);
