import React from "react";
import Playlist from "./Playlist";
import ContentSelector from "./ContentSelector";

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
				<Playlist />
				<ContentSelector />
			</div>
		</div>
	);
};

export default Dashboard;
