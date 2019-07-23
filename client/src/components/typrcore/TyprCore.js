import React, { Component } from "react";
import history from "../../history";

import { connect } from "react-redux";
import { fetchNews, fetchUser } from "../../actions";

import { TyprSessionContainer } from "./TyprSessionContainer";
import "./TyprCore.css";

const welcomeText =
	"Welcome to typr! Register for free to practice typing your favourite books, breaking news articles and unique, algorithmically-generated exercises that target your identified weaknesses. Customize your content feed using the library-builder, track progress with detailed analytics, and 10x your learning efficiency while reading the things you want to be reading.";

class TyprCore extends Component {
	componentDidMount() {
		this.props.fetchUser();
		this.props.fetchNews();
	}

	render() {
		if (!this.props.news) {
			return <div>Loading news headlines...</div>;
		}
		//TODO: implement bookmark in user model to track paragraph position instead of news[0]
		return <TyprSessionContainer text={this.props.news[0]} />;
	}
}

const mapStateToProps = state => {
	return { news: state.news, auth: state.auth };
};

export default connect(
	mapStateToProps,
	{ fetchNews, fetchUser }
)(TyprCore);
