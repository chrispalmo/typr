import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchNews, fetchUser, firstParagraph } from "../../actions";

import TyprSessionContainer from "./TyprSessionContainer";
import "./TyprCore.css";

// const welcomeText =
// 	"Welcome to typr! Register for free to practice typing your favourite books, breaking news articles and unique, algorithmically-generated exercises that target your identified weaknesses. Customize your content feed using the library-builder, track progress with detailed analytics, and 10x your learning efficiency while reading the things you want to be reading.";

class TyprCore extends Component {
	componentDidMount() {
		this.props.fetchUser();
		this.props.fetchNews();
		this.props.firstParagraph();
	}

	render() {
		if (!this.props.news) {
			return <div>Loading news headlines...</div>;
		}
		//TODO: implement bookmark in user model to track paragraph position instead of news[0]
		const currentPosition = this.props.auth.newsDigest.currentPosition;
		const text = this.props.news[currentPosition].title;
		const source = this.props.news[currentPosition].source;

		// When a key changes, React will create a new component instance rather than update the current one
		return (
			<TyprSessionContainer key={currentPosition} text={text} source={source} />
		);
	}
}

const mapStateToProps = state => {
	return { news: state.news, auth: state.auth };
};

export default connect(
	mapStateToProps,
	{ fetchNews, fetchUser, firstParagraph }
)(TyprCore);
