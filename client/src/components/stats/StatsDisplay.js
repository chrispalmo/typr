import React, { Component } from "react";
import { connect } from "react-redux";
import {
	fetchUser,
	fetchNewsSources,
	fetchNews,
	fetchStatsAlltime
} from "../../actions";
import history from "../../history";
import timeBreakdown from "../../helpers/timeBreakdown";

//TODO: ONLY UPDATE WHEN REPRESH BUTTON PRESSED
//TODO: ADD "LAST UPDATED XXXXXXXX AGO" LABEL
class NewsSources extends Component {
	//pre-load before user navigates to news sources
	componentDidMount() {
		this.props.fetchUser();
		this.props.fetchStatsAlltime();
	}

	render() {
		return (
			<div className="ui compact segments" style={{ minWidth: "40em" }}>
				<div className="ui center aligned secondary segment">
					<span>
						<div className="ui icon header grey">
							Typing Statistics Overview
						</div>
					</span>
					<button
						onClick={() => this.props.fetchStatsAllTime}
						className="ui right floated icon button huge"
					>
						<i className="refresh icon" />
					</button>
				</div>
				{this.renderStatOverview()}
			</div>
		);
	}

	renderStatOverview() {
		if (!this.props.stats.allTime) {
			return (
				<div className="ui center aligned secondary segment">
					<p>Loading Typing Statistics...</p>
				</div>
			);
		}

		const wordsTyped = this.props.stats.allTime.wordsTyped;
		const charsTyped = this.props.stats.allTime.charsTyped;
		const wpm = Math.round(
			1000 *
				60 *
				(this.props.stats.allTime.wordsTyped /
					this.props.stats.allTime.totalTime)
		);
		const accuracy = Math.round(100 * this.props.stats.allTime.accuracy);
		const typingTime = timeBreakdown.timeBreakdownToString(
			this.props.stats.allTime.totalTime
		);

		return (
			<div>
				<table className="ui very basic table" style={{ padding: "1em" }}>
					<thead>
						<tr>
							<th />
							<th className="center aligned">Today</th>
							<th className="center aligned">All Time</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Words:</td>
							<td className="center aligned">TBC</td>
							<td className="center aligned">{wordsTyped}</td>
						</tr>
						<tr>
							<td>Characters:</td>
							<td className="center aligned">TBC</td>
							<td className="center aligned">{charsTyped}</td>
						</tr>
						<tr>
							<td>WPM:</td>
							<td className="center aligned">TBC</td>
							<td className="center aligned">{wpm}</td>
						</tr>
						<tr>
							<td>Accuracy:</td>
							<td className="center aligned">TBC</td>
							<td className="center aligned">{accuracy}%</td>
						</tr>
						<tr>
							<td>Typing Time:</td>
							<td className="center aligned">TBC</td>
							<td className="center aligned">{typingTime}</td>
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
	return {
		newsSources: state.newsSources,
		auth: state.auth,
		news: state.news,
		stats: state.stats
	};
};

export default connect(
	mapStateToProps,
	{ fetchUser, fetchNewsSources, fetchNews, fetchStatsAlltime }
)(NewsSources);
