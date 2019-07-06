import React from "react";
import SignIn from "./SignIn";
import Demo from "./Demo";

const Landing = () => {
	return (
		<div style={{ alignItems: "right" }}>
			<div
				style={{
					alignItems: "center",
					display: "flex",
					height: "100%",
					paddingTop: "20px",
					paddingRight: "20px",
					paddingBottom: "20px",
					paddingLeft: "20px"
				}}
			>
				<Demo />
				<SignIn />
			</div>
		</div>
	);
};

export default Landing;
