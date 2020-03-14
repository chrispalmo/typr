import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchNews, clearNews, fetchUser, firstParagraph } from "../../actions";

import TyprCore from "./TyprCore";
import TyprLiveWPM from "./TyprLiveWPM";
import "./TyprSessionContainer.css";

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
			return (
				<div className="ui icon message">
				  <i className="notched circle loading icon"></i>
				  <div className="content">
				    <div className="header">
				      Loading News Headlines
				    </div>
				    <p>Just one second...</p>
				  </div>
				</div>
			)
		}
		const currentPosition = this.props.auth.user.newsDigest.currentPosition;
		const text = this.props.news[currentPosition].title;
		const source = this.props.news[currentPosition].source;
		const url = this.props.news[currentPosition].url

		return (
			<div>
				<TyprCore key={currentPosition} text={text} source={source} />
				<div className="">
					<TyprLiveWPM showBar={true} showGraph={true} />
				</div>
				<div style={{textAlign: "center"}}>
					<br/>
					Headline {currentPosition+1} of {this.props.news.length}
					<br/>
					Source: <a href={url}>{source}</a>
				</div>
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
