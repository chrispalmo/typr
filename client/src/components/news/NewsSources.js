import React from "react";
import { Link } from "react-router-dom";

const NewsSources = () => {
	return (
		<div
			style={{
				justifyContent: "center",
				display: "flex",
				flex: 1
			}}
		>
			<h5>NewsSources</h5>
			<p>
				<button className="btn amber lighten-1">
					<Link to="/content/news-select" style={{ color: "black" }}>
						Select News Sources
					</Link>
				</button>
			</p>
		</div>
	);
};

export default NewsSources;
