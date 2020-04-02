import { Link } from "react-router-dom";

import * as actions from "../../actions";
import { analyze, auto_pause_delay } from "../../helpers/clientStatAnalysis";
import { timeBreakdownToString } from "../../helpers/timeBreakdown";

import React, { Component } from "react";
import { connect } from "react-redux";

class Debrief extends Component {
	constructor(props) {
		super(props);
		this.state = {
			charsTyped: "",
			accuracy: "",
			totalTime: "",
			wpm: "",
		};
	}

	componentDidMount() {
		if (this.props.keylog) {
			if (this.props.keylog.length !== 0) {
				const rawStats = analyze(this.props.keylog, auto_pause_delay);
				this.props.saveSessionStats(rawStats);
				// rather than reading state from redux store-connected props (which would require wating for server response), directly set component state
				this.setState({
					charsTyped: rawStats.charsTyped,
					accuracy: Math.round(1000 * rawStats.accuracy) / 10,
					totalTime: timeBreakdownToString(rawStats.totalTime, 2),
					wpm: rawStats.wpm,
				});
			}
		}
	}
	render() {
		return (
			<div>
				<div
					className="ui centre aligned secondary segment"
					textalign="center"
				>
					<div className="ui center aligned">
						<h2 className="ui center aligned header">Good Job!</h2>
						<h4 className="ui center aligned header">
							You typed
							<div className="ui label green">
								{this.state.charsTyped}
							</div>{" "}
							characters in
							<div className="ui label green">
								{this.state.totalTime}
							</div>{" "}
							at an average
							<br />
							<br />
							speed of
							<div className="ui label green">
								{this.state.wpm} WPM
							</div>
							<sup>*</sup> with
							<div className="ui label green">
								{this.state.accuracy}%
							</div>{" "}
							accuracy.
						</h4>
						<div style={{ textAlign: "center" }}>
							<small>
								<sup>*</sup>WPM = "Words Per Minute".{" "}
								<Link to="">Read more</Link> about how this is
								calculated.
							</small>
							<br />
							<br />
							{this.renderReturnButton()}
							{this.renderSelectButton()}
							<br />
						</div>
					</div>
				</div>
				<h3 className="ui center aligned header">
					Did any of the headlines catch your interest?
				</h3>
				<div style={{ textAlign: "center" }}>
					Select an article to continue practicing with the full text:
				</div>
				<br />
				{this.renderArticles()}
				<br />
				<br />
			</div>
		);
	}

	renderReturnButton() {
		return (
			<Link to="/dashboard">
				<button
					className="ui button"
					onClick={() => {
						this.props.clearKeylog();
					}}
				>
					<i className="chevron circle left icon" />
					{"   "}Return to Dashboard
				</button>
			</Link>
		);
	}

	renderSelectButton() {
		return (
			<Link to="/content/news-select">
				<button
					className="ui button"
					onClick={() => {
						this.props.clearKeylog();
					}}
				>
					Re-select News Sources{"   "}
					<i className="chevron circle right icon" />
				</button>
			</Link>
		);
	}

	renderArticles() {
		const articles = [];
		if (this.props.news) {
			this.props.news.forEach((article) => {
				articles.push(
					<div
						key={articles.length + 1}
						className="ui secondary segment"
						onClick={() => {
							alert(
								"You just discovered an 'in-development' feature. Check back later for full-text article support."
							);
						}}
					>
						<a
							href={article.url}
							target="_blank"
							style={{ color: "black" }}
						>
							<h4 className="ui center aligned header">
								{article.title} [{article.source}]
							</h4>
							{article.content}
						</a>
					</div>
				);
			});
		}
		return articles;
	}
}

function mapStateToProps({ news, keylog }) {
	return { news, keylog };
}

export default connect(mapStateToProps, actions)(Debrief);
