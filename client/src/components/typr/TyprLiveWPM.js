import React, { Component } from "react";
import { connect } from "react-redux";

import TyprProgressBar from "./TyprProgressBar";
// import TyprLiveChart from "./TyprLiveChart";

// TODO: WpmContainer/WpmLiveChart
// https://gionkunz.github.io/chartist-js/examples.html
// https://stackoverflow.com/questions/29523678/chartist-js-remove-labels

const debug = false;

class TyprLiveWPM extends Component {
	constructor(props) {
		super(props);
		this.state = {
			windowWidth: 500,
			windowHeight: 0
		};

		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}
	render() {
		const wpm = this.instantaneousWPM();
		return (
			<div>
				<TyprProgressBar
					ref={this.WPMMeter}
					percent={wpm / 150}
					width={this.state.windowWidth - 100}
					height={17}
					rounded={true}
				/>
				<div className="wpmText">WPM: {wpm}</div>
			</div>
		);
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
		//TODO: REACTIVATE INTERVAL BEFORE DEPLOYMENT
		//Trigger regular renders to keep WPM bar moving
		this.interval = setInterval(() => this.forceUpdate(), 250);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateWindowDimensions);
		//TODO: REACTIVATE INTERVAL BEFORE DEPLOYMENT
		//Clear regular renders required to keep WPM bar moving
		clearInterval(this.interval);
	}

	instantaneousWPM() {
		debug ? console.log("TyprSessionStats.instantaneousWPM() called") : null;
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
