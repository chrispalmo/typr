import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchNewsSources, fetchNews } from "../../actions";

class NewsSources extends Component {
	//pre-load before user navigates to news sources
	componentDidMount() {
		this.props.fetchNewsSources({ language: "en" });
		this.props.fetchNews();
	}

	render() {
		return (
			<div className="ui compact segments" style={{ minWidth: "40em" }}>
				<div className="ui center aligned secondary segment">
					<span>
						<div className="ui icon header grey">
							Daily Headlines
							<p style={{ fontSize: "0.75em" }}>
								Powered by{" "}
								<a
									href="https://newsapi.org/"
									target="_blank"
									rel="noopener noreferrer"
								>
									NewsAPI.org
								</a>
							</p>
						</div>
					</span>
					<button className="ui right floated icon button huge">
						<Link
							to="/content/news-select"
							style={{ color: "#5A5A5A" }}
						>
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
		if (this.props.auth.loading) {
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
			this.props.auth.user.newsDigest.selectedSources.length === 0;

		if (noSelectedSources) {
			return (
				<div className="ui center aligned secondary segment">
					<div className="ui icon header grey">
						<i className="newspaper outline icon" />
						<p>No news sources selected</p>
					</div>
					<p>Select some news sources to start typing</p>
				</div>
			);
		}

		const selectedSources = [];
		this.props.auth.user.newsDigest.selectedSources.forEach((source) => {
			selectedSources.push(
				<span>
					<Link
						to="/content/news-select"
						key={source}
						className="ui label"
					>
						{source} <i className="icon" />
					</Link>
					{"   "}
				</span>
			);
		});
		return (
			<div className="ui center aligned secondary segment">
				<div className="ui grey labels">{selectedSources}</div>
			</div>
		);
	}

	renderButton() {
		if (this.props.auth.loading) {
			return (
				<div className="ui center aligned secondary segment">
					<p>Loading...</p>
				</div>
			);
		}

		const noSelectedSources =
			this.props.auth.user.newsDigest.selectedSources.length === 0;
		if (noSelectedSources) {
			return (
				<div className="ui center aligned secondary segment">
					<button className="ui button orange">
						<Link
							to="/content/news-select"
							style={{ color: "white" }}
						>
							Select news sources
						</Link>
					</button>
				</div>
			);
		}

		return (
			<div className="ui center aligned secondary segment">
				<button className="ui button orange">
					<Link to="/app" style={{ color: "white" }}>
						<i className="keyboard icon large" /> Start Typing
					</Link>
				</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		newsSources: state.newsSources,
		auth: state.auth,
		news: state.news,
	};
};

export default connect(mapStateToProps, { fetchNewsSources, fetchNews })(
	NewsSources
);
