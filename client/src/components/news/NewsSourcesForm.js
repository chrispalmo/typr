import React, { Component } from "react";
import _ from "lodash";
import { connect, reduxForm, Field } from "react-redux";
import { Link } from "react-router-dom";
import { fetchNewsSources } from "../../actions";

class NewsSourcesForm extends Component {
	componentDidMount() {
		this.props.fetchNewsSources({ language: "en" });
	}

	render() {
		return (
			<div
				style={{
					alignItems: "left",
					display: "flex",
					paddingTop: "20px",
					paddingRight: "20px",
					paddingBottom: "20px",
					paddingLeft: "20px"
				}}
			>
				<h5>NewsSourcesForm</h5>
				{this.renderList()}
			</div>
		);
	}

	renderList() {
		const newsSources = this.props.newsSources;
		if (!newsSources) {
			console.log("renderList function: waiting for news sources to load...");
			return null;
		}
		console.log(this.props.newsSources);
		console.log("renderList function: rendering list of news sources");
		const sources = [];
		_.toPairs(this.props.newsSources.sources).forEach(source => {
			// console.log(source.name + " " + source.description);
			console.log(source);
			sources.push(
				<div className="item" key={source[1].id}>
					{source[1].name + " " + source[1].description}
				</div>
			);
		});
		console.log("***");
		console.log(sources);
		console.log("***");
		return sources;
	}
}

const mapStateToProps = state => {
	return { newsSources: state.news };
};

export default connect(
	mapStateToProps,
	{ fetchNewsSources }
)(NewsSourcesForm);
