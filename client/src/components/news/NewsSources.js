import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchNewsSources } from "../../actions";

class NewsSources extends Component {
	//pre-load before user navigates to news sources
	componentDidMount() {
		this.props.fetchNewsSources({ language: "en" });
	}

	render() {
		return (
			<div
				style={{
					justifyContent: "center",
					display: "flex",
					flex: 1
				}}
			>
				<h5>NewsSources</h5>
				<p>
					<button className="btn amber lighten-1">
						<Link to="/content/news-select" style={{ color: "black" }}>
							Select News Sources
						</Link>
					</button>
				</p>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { newsSources: state.news };
};

export default connect(
	mapStateToProps,
	{ fetchNewsSources }
)(NewsSources);
