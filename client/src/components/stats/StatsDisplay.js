import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSessionStats } from "../../actions";
import getWeekdayString from "../../helpers/getWeekdayString";
import getMonthString from "../../helpers/getMonthString";
import timeBreakdown from "../../helpers/timeBreakdown";

class NewsSources extends Component {
	//pre-load before user navigates to news sources
	componentDidMount() {
		this.props.fetchSessionStats();
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
						onClick={() => this.props.fetchSessionStats}
						className="ui right floated icon button huge"
					>
						<i className="refresh icon" />
					</button>
				</div>
				<tr>
					{this.renderStatOverview()}
				</tr>
			</div>
		);
	}

	renderStatOverview() {
		const noStats = (
			<div className="ui center aligned secondary segment">
				<p>You have no recorded typing sessions.</p>
			</div>
		);

		if (!this.props.stats) {
			return noStats
		}

		if (this.props.stats.length == 0) {
			return noStats
		}

		return (
			<div>
				<table className="ui very basic table unstackable" style={{ padding: "1em" }}>
					<thead>
						<tr>
							<th className="center aligned">Date</th>
							<th className="center aligned">Characters</th>
							<th className="center aligned">WPM</th>
							<th className="center aligned">Accuracy</th>
							<th className="center aligned">Total Time</th>
						</tr>
					</thead>
					<tbody>
						{this.renderStatTableRows()}
					</tbody>
				</table>
			</div>
		);
	}

	renderStatTableRows() {
		let rows = []	
		const statsReverseChronOrder = this.props.stats.sort((a,b)=>(parseInt(a.timestamp) < parseInt(b.timestamp) ? 1 : -1))	
		statsReverseChronOrder.forEach(session => {
			const date = new Date(parseInt(session.timestamp))
			const dayName = getWeekdayString(date).slice(0,3)
			const dayNum = date.toISOString().slice(0,10).split("-")[2]
			const monthName = getMonthString(date).slice(0,3)
			const year = date.toISOString().slice(0,10).split("-")[0]
			const time = [
				("00"+date.getHours()).slice(-2),
				":",
				("00"+date.getMinutes()).slice(-2)
			].join("")
			const formattedStats = {
				date: [dayName,dayNum,monthName,year,time].join(" "),
				charsTyped: session.charsTyped,
				wpm: session.wpm,
				accuracy: (Math.round(100 * session.accuracy)).toString()+"%",
				typingTime: timeBreakdown.timeBreakdownToString(
					session.totalTime,2)
			}
			const row = []
			Object.values(formattedStats).forEach(stat => {
			  row.push(
			  	<td className="center aligned">{stat}</td>
				)
			})
			rows.push(
				<tr>{row}</tr>
			)
		}) 
		return rows
	}
}

const mapStateToProps = state => {
	return {
		stats: state.stats
	};
};

export default connect(
	mapStateToProps,
	{ fetchSessionStats }
)(NewsSources);
