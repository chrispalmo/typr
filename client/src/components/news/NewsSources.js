import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchNewsSources, fetchUser } from "../../actions";
import history from "../../history";

class NewsSources extends Component {
	//pre-load before user navigates to news sources
	componentDidMount() {
		this.props.fetchNewsSources({ language: "en" });
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="ui compact segments">
				<div className="ui center aligned secondary segment">
					<span>
						<div className="ui icon header grey">
							Daily Headlines
							<p style={{ fontSize: "0.75em" }}>
								Powered by{" "}
								<a href="https://newsapi.org/" target="_blank">
									NewsAPI.org
								</a>
							</p>
						</div>
					</span>
					<button className="ui right floated icon button huge">
						<Link to="/content/news-select" style={{ color: "#5A5A5A" }}>
							<i className="cog icon" />
						</Link>
					</button>
				</div>
				{this.renderSelectedNewsSources()}
				{this.renderButton()}
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

	renderButton() {
		if (!this.props.auth) {
			return (
				<div className="ui center aligned secondary segment">
					<p>Loading...</p>
				</div>
			);
		}

		const noSelectedSources =
			this.props.auth.newsDigest.selectedSources.length === 0;

		if (noSelectedSources) {
			return (
				<div className="ui center aligned secondary segment">
					<button className="ui button">
						<Link to="/content/news-select" style={{ color: "#5A5A5A" }}>
							Select news sources
						</Link>
					</button>
				</div>
			);
		}

		return (
			<div className="ui center aligned secondary segment">
				<button className="ui button">
					<Link to="/app" style={{ color: "#5A5A5A" }}>
						<i className="keyboard icon large" /> Start Typing
					</Link>
				</button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { newsSources: state.newsSources, auth: state.auth };
};

export default connect(
	mapStateToProps,
	{ fetchNewsSources, fetchUser }
)(NewsSources);
