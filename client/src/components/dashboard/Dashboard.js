import React from "react";
import NewsSources from "../news/NewsSources";
import StatsDisplay from "../stats/StatsDisplay";

const Dashboard = () => {
	return (
		<div
			className="ui one column centered grid middle aligned"
			style={{ height: "70vh" }}
		>
			<div>
				<NewsSources />
				<div> </div>
				<StatsDisplay />
			</div>
		</div>
	);
};

export default Dashboard;
