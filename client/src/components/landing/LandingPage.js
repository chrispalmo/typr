import React from "react";
import Register from "./Register";
import Demo from "./Demo";

const Landing = () => {
	return (
		<div style={{ alignItems: "right" }}>
			<div
				style={{
					alignItems: "center",
					display: "flex",
					height: "100%"
				}}
			>
				<Demo />
				<Register />
			</div>
		</div>
	);
};

export default Landing;
