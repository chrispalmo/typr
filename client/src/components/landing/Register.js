import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
	return (
		<div
			style={{
				justifyContent: "center",
				display: "flex",
				flex: 1
			}}
		>
			<div>
				<a class="btn waves-effect waves-light yellow">Sign in with Google</a>
				<div>email-input</div>
				<div>password-input</div>
				<div>register-button</div>
				<div>Have an account?</div>
				<div>
					<Link to="/login">Log in</Link>
				</div>
				<div>Logo-bottom-right</div>
			</div>
		</div>
	);
};

export default Register;
