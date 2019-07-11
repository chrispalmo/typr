import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchNewsSources } from "../../actions";

//TODO -- connect component to redux

class NewsSources extends Component {
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
				<h5>NewsSources</h5>
				{console.log("rendering news sources")}
				{console.log(this.props.sources)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { sources: state.news };
};

export default connect(
	mapStateToProps,
	{ fetchNewsSources }
)(NewsSources);
