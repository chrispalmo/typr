import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class SignIn extends Component {
	render() {
		return (
			<div
				style={{
					justifyContent: "center",
					display: "flex",
					flex: 1
				}}
			>
				<div>
					<button className="btn amber lighten-1">
						<a href="/auth/google" style={{ color: "black" }}>
							Sign In With Google
						</a>
					</button>
					<div style={{ display: "flex", paddingTop: "10px" }}>
						<div style={{ flex: 1 }}>
							<hr />
						</div>
						<div
							style={{
								display: "flex",
								paddingRight: "10px",
								paddingLeft: "10px"
							}}
						>
							or
						</div>
						<div style={{ flex: 1 }}>
							<hr />
						</div>
					</div>
					<div>[email-input]</div>
					<div>[password-input]</div>
					<div>[SignIn-button]</div>
					<div>
						Have an account? <Link to="/login">Log in</Link>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(SignIn);
