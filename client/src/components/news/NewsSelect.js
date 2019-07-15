import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { fetchNewsSources } from "../../actions";

class NewsSelect extends Component {
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
				<form action="#">
					<p>
						<label>
							<input type="checkbox" />
							<span>Red</span>
						</label>
					</p>
					<p>
						<label>
							<input type="checkbox" checked="checked" />
							<span>Yellow</span>
						</label>
					</p>
					<p>
						<label>
							<input type="checkbox" class="filled-in" checked="checked" />
							<span>Filled in</span>
						</label>
					</p>
					<p>
						<label>
							<input id="indeterminate-checkbox" type="checkbox" />
							<span>Indeterminate Style</span>
						</label>
					</p>
					<p>
						<label>
							<input type="checkbox" checked="checked" disabled="disabled" />
							<span>Green</span>
						</label>
					</p>
					<p>
						<label>
							<input type="checkbox" disabled="disabled" />
							<span>Brown</span>
						</label>
					</p>
				</form>
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
				<div className="item" key={source[1].id}>
					<li>
						<div className="divider" />
						<div className="section">
							<h5>
								<form action="#">
									<p>
										<label>
											<input
												type="checkbox"
												id="check"
												class="filled-in"
												checked="checked"
											/>
											<span>Filled in</span>
										</label>
									</p>
								</form>
								{source[1].name}
							</h5>
							<p>{source[1].description}</p>
						</div>
					</li>
				</div>
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
