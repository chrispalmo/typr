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
				<button className="btn amber lighten-1">Sign in with Google</button>
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
				<div>[register-button]</div>
				<div>
					Have an account? <Link to="/login">Log in</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;
