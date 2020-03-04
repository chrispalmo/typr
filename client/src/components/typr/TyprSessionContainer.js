import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchNews, clearNews, fetchUser, firstParagraph } from "../../actions";

import TyprCore from "./TyprCore";
import TyprLiveWPM from "./TyprLiveWPM";
import "./TyprSessionContainer.css";

// const welcomeText =

// TODO: WpmContainer/WpmLiveBar
// TODO: WpmContainer/WpmLiveChart
// https://gionkunz.github.io/chartist-js/examples.html
// https://stackoverflow.com/questions/29523678/chartist-js-remove-labels

class TyprSessionContainer extends Component {
	componentDidMount() {
		this.props.clearNews();
		this.props.fetchUser();
		this.props.fetchNews();
		this.props.firstParagraph();
	}

	componentWillUnmount() {
		console.log("UNMOUNTING TyprSessionContainer...");
	}

	render() {
		if (!this.props.news) {
			return <div>Loading news headlines...</div>;
		}
		//TODO: implement bookmark in user model to track paragraph position instead of news[0]
		const currentPosition = this.props.auth.user.newsDigest.currentPosition;
		const text = this.props.news[currentPosition].title;
		const source = this.props.news[currentPosition].source;

		// When a key changes, React will create a new component instance rather than update the current one
		return (
			<div>
				<TyprCore key={currentPosition} text={text} source={source} />
				<TyprLiveWPM showBar={true} showGraph={true} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { news: state.news, auth: state.auth };
};

export default connect(
	mapStateToProps,
	{ fetchNews, clearNews, fetchUser, firstParagraph }
)(TyprSessionContainer);
