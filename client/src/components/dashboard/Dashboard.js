import React from "react";
import NewsSources from "../news/NewsSources";

const Dashboard = () => {
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
				<h5>Dashboard</h5>
				<NewsSources />
			</div>
		</div>
	);
};

export default Dashboard;
