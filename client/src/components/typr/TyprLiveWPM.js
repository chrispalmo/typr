import React, { Component } from "react";
import { connect } from "react-redux";

import TyprProgressBar from "./TyprProgressBar";
import ChartistGraph from "react-chartist";

const debug = false;

class TyprLiveWPM extends Component {
	constructor(props) {
		super(props);
		const maxGraphDataSize = 200;
		const graphData = [];
		var i;
		for (i = 0; i < maxGraphDataSize; i++) {
			graphData.push(0);
		}
		this.state = {
			windowWidth: 500,
			windowHeight: 0,
			wpm: 0,
			graphData: graphData
		};

		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.updateWPM = this.updateWPM.bind(this);
	}
	render() {
		return (
			<div className="ui segment">
				{this.renderWPMBar()}
				<br/>
				{this.renderWPMGraph()}
			</div>
		);
	}

	renderWPMBar() {
		if (this.props.showBar) {
			// state.windowWidth is used as key to enforce component remount on window resize. This is because the child component can only access the width of the parent component in the componentDidMount lifecycle function, and this function is only called once when a component mounts. 
			return (
				<div>
					<TyprProgressBar
						key={this.state.windowWidth}
						ref={this.WPMMeter}
						percent={this.state.wpm / 150}
						height={17}
						rounded={true}
					/>
				</div>
			);
		}
		return null;
	}

	renderWPMGraph() {
		if (this.props.showGraph) {
			var graphData = {
				series: [this.state.graphData]
			};
			var graphOptions = {
				high: 150,
				low: 0,
				showArea: false,
				showLine: true,
				showPoint: false,
				axisX: {
					showLabel: false,
					showGrid: true
				},
				axisY: {
					showLabel: true,
					showGrid: false
				},
				chartPadding: 0
			};

			return (
				<div>
					<ChartistGraph
						data={graphData}
						options={graphOptions}
						type={"Line"}
					/>
					<div className="wpmText">WPM: {this.state.wpm}</div>
				</div>
			);
		}
		return null;
	}

	componentWillMount() {
		this.updateWindowDimensions();
	}

	updateWindowDimensions() {
		this.setState({
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight
		});
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateWindowDimensions);
		//Trigger regular renders to keep WPM bar moving
		this.interval = setInterval(() => this.updateWPM(), 100);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateWindowDimensions);
		//Clear regular renders required to keep WPM bar moving
		clearInterval(this.interval);
	}

	updateWPM() {
		const newWPM = this.instantaneousWPM();
		this.setState({
			wpm: newWPM
		});
		//update graph data with new wpm
		const newGraphData = this.state.graphData.slice(1);

		newGraphData.push(newWPM);
		this.setState(prevState => ({
			graphData: newGraphData
		}));
	}

	instantaneousWPM() {
		if (debug) {console.log("TyprSessionStats.instantaneousWPM() called")};
		if (!this.props.keylog) return 0;
		const length = this.props.keylog.length;
		if (length < 2) {
			return 0;
		}
		var sampleSize = 30;
		if (sampleSize > length) {
			sampleSize = length;
		}
		const totalCorrectChars = this.props.keylog
			.slice(-sampleSize)
			.reduce((total, dataLine) => {
				return total + dataLine.wpmCounter;
			}, 0);
		const time1 = this.props.keylog[length - sampleSize].timestamp;
		const wpm = Math.round(
			totalCorrectChars / 5 / ((Date.now() - time1) / 60000)
		);
		if (wpm < 0) {
			return 0;
		}
		return wpm;
	}
}

const mapStateToProps = state => {
	return { keylog: state.keylog };
};

export default connect(
	mapStateToProps,
	{}
)(TyprLiveWPM);
