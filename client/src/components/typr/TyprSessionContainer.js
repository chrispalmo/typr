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

	render() {
		if (!this.props.news) {
			return (
				<div className="ui container">
					<div className="ui icon message">
					  <i className="notched circle loading icon"></i>
					  <div className="content">
					    <div className="header">
					      Loading News Headlines
					    </div>
					    <p>Just one second...</p>
					  </div>
					</div>
				</div>
			)
		}
		const currentPosition = this.props.auth.user.newsDigest.currentPosition;
		const source = this.props.news[currentPosition].source;
		const text = this.props.news[currentPosition].title;
		return (
			<div className="ui container">
				<TyprCore key={currentPosition} text={text} source={source} />
				<div>
					<TyprLiveWPM showBar={true} showGraph={true} />
				</div>
				{this.renderCurrentPosition()}
				{this.renderCapsLockWarning()}
			</div>
		);
	}

	renderCapsLockWarning() {
		if (this.props.gameState.capsLockOn) {
			return (
				<div className ="ui message floatabove negative">
					Warning: Caps Lock Enabled!
				</div>
			)
		} else {
			return<div></div>
		}
	}

	renderCurrentPosition() {
		const currentPosition = this.props.auth.user.newsDigest.currentPosition;
		const source = this.props.news[currentPosition].source;
		const url = this.props.news[currentPosition].url
		return (
			<div style={{textAlign: "center"}}>
				<br/>
				Headline {currentPosition+1} of {this.props.news.length}
				<br/>
				Source: <a href={url}>{source}</a>
			</div>
		)
	}

}

const mapStateToProps = state => {
	return { 
		news: state.news, 
		auth: state.auth,
		gameState: state.gameState,
	};
};

export default connect(
	mapStateToProps,
	{ fetchNews, clearNews, fetchUser, firstParagraph }
)(TyprSessionContainer);
