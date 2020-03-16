import { Link } from "react-router-dom";

import * as actions from "../../actions";
import { analyze, auto_pause_delay } from "../../helpers/clientStatAnalysis";
import { timeBreakdownToString } from "../../helpers/timeBreakdown"

import React, { Component } from "react";
import { connect } from "react-redux";

class Debrief extends Component {
	render() {
		let charsTyped = "..."
		let accuracy = "..."
		let totalTime = "..."
		let wpm = "..."
		let stats
		if (this.props.keylog) {
			if(this.props.keylog.length!==0) {
				stats=analyze(
					this.props.keylog,
					auto_pause_delay
				)
				charsTyped = stats.charsTyped 
				accuracy = Math.round(1000*stats.accuracy)/10 //convert to %, 1 decimal 
				totalTime = timeBreakdownToString(stats.totalTime,2)			
				wpm = Math.round(charsTyped/(stats.totalTime/1000/60)/5)
			}
		}
		return (
			<div>
				<div className="ui centre aligned secondary segment" textalign="center">
					<div className="ui center aligned">
						<h2 className="ui center aligned header">Good Job!</h2>
						<h4 className="ui center aligned header">
							You typed <div className="ui label green">{charsTyped}</div> characters in <div className="ui label green">{totalTime}</div> at an average 
							<br/>
							<br/>
							speed of <div className="ui label green">{wpm} WPM</div><sup>*</sup> at <div className="ui label green">{accuracy}%</div> accuracy.</h4>
						<div style={{textAlign: "center"}}>
							<small><sup>*</sup>WPM = "Words Per Minute". <Link to="">Read more</Link> about how this is calculated.</small>
						<br/>
						<br/>
						{this.renderReturnButton()}
						{this.renderSelectButton()}
						<br/>
						</div>
					</div>
				</div>
					<h3 className="ui center aligned header">
						Did any of the headlines catch your interest? 
					</h3>
					<div style={{textAlign: "center"}}>
					Select an article to continue practicing with the full text:
					</div>
				<br/>
				{this.renderArticles()}
				<br/>
				<br/>
			</div>
		);
	}

	renderReturnButton() {
		return (
			<Link to="/dashboard">
				<button 
					className="ui button"
					onClick={() => {
						this.props.clearKeylog()
					}}
				>
					<i className="chevron circle left icon" />
					{"   "}Return to Dashboard
				</button>
			</Link>
		)
	}

	renderSelectButton() {
		return (
			<Link to="/content/news-select">
				<button 
					className="ui button"
					onClick={() => {
						this.props.clearKeylog()
					}}
				>
						Re-select News Sources{"   "}
					<i className="chevron circle right icon" />
				</button>
			</Link>
		)
	}

	renderArticles() {
		const articles = [];
		if (this.props.news) {
			this.props.news.forEach(article => {
				articles.push(
					<div
						key={articles.length+1}
						className="ui secondary segment"
						onClick={() => {alert("You just discovered an 'in-development' feature. Check back later for full-text article support.")}}
					>
						<a href="#">
							{article.content}
						</a>
					</div>
				)
			});
		}
	return articles
	}

}

function mapStateToProps({ auth, news, keylog }) {
  return { auth, news, keylog };
}

export default connect(
  mapStateToProps,
  actions
)(Debrief);