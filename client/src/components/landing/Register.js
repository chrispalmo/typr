import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
	return (
		<div style={{ textAlign: "center" }}>
			<h5>
				<div>
					<h2>Register</h2>
					<div>email-input</div>
					<div>password-input</div>
					<div>register-button</div>
					<div>Have an account?</div>
					<div>
						<Link to="/login">Log in</Link>
					</div>
					<div>Logo-bottom-right</div>
				</div>
			</h5>
		</div>
	);
};

export default Register;
