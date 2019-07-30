import React, { Component } from "react";

class SignIn extends Component {
	render() {
		return (
			<div>
				{this.renderGoogleButton()}
				{this.renderDivider()}
				{this.renderInput()}
			</div>
		);
	}

	renderGoogleButton() {
		return (
			<div style={{ display: "flex", justifyContent: "center" }}>
				<button className="ui google plus button">
					<a href="/auth/google" style={{ color: "white" }}>
						<i className="google plus g icon" />
						{"   "}Sign in with Google
					</a>
				</button>
			</div>
		);
	}

	renderDivider() {
		return (
			<div style={{ display: "flex", paddingTop: "1em", paddingBottom: "1em" }}>
				<div style={{ flex: 1 }}>
					<hr />
				</div>
				<div
					style={{
						display: "flex",
						paddingRight: "1em",
						paddingLeft: "1em"
					}}
				>
					or
				</div>
				<div style={{ flex: 1 }}>
					<hr />
				</div>
			</div>
		);
	}

	renderInput() {
		return (
			<div
				className="ui input"
				style={{ display: "flex", justifyContent: "center" }}
			>
				<input type="text" placeholder="Your email" />
				<button className="ui primary button disabled">
					<a href={null} style={{ color: "white" }}>
						Register
					</a>
				</button>
			</div>
		);
	}
}

export default SignIn;
