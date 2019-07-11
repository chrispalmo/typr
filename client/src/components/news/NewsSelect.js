import React, { Component } from "react";
import _ from "lodash";
import { connect, reduxForm, Field } from "react-redux";
import { Link } from "react-router-dom";
import { fetchNewsSources } from "../../actions";

class NewsSelect extends Component {
	componentDidMount() {
		this.props.fetchNewsSources({ language: "zh" });
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
				<ul>{this.renderList()}</ul>
			</div>
		);
	}

	renderList() {
		const newsSources = this.props.newsSources;
		if (!newsSources) {
			return <h5>NewsSelect</h5>;
		}
		const sources = [];
		_.toPairs(this.props.newsSources.sources).forEach(source => {
			sources.push(
				<li>
					<div className="item" key={source[1].id}>
						<div className="divider" />
						<div class="section">
							<h5>{source[1].name}</h5>
							<p>{source[1].description}</p>
						</div>
					</div>
				</li>
			);
		});
		return sources;
	}
}

const mapStateToProps = state => {
	return { newsSources: state.news };
};

export default connect(
	mapStateToProps,
	{ fetchNewsSources }
)(NewsSelect);
