import React from "react";
import NewsSources from "../news/NewsSources";
import StatsDisplay from "../stats/StatsDisplay";

const Dashboard = () => {
	return (
		<div style={{ alignItems: "right" }}>
			<div>
				<NewsSources />
				<div> </div>
				<StatsDisplay />
			</div>
		</div>
	);
};

export default Dashboard;
