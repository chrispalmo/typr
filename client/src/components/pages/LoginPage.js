import React from 'react';
import LoginForm from "./LoginForm";
import TyprCore from "../typr/TyprCore";

const demoText = "Welcome to typr.";

const Landing = () => {
	return (
		<div
			className="ui one column centered grid middle aligned"
			style={{ height: "70vh" }}
		>
			<div className="ui one column centered grid middle aligned">
				<div className="ui two column centered row">
					<div className="column" style={{ maxWidth: "30em" }}>
						{<TyprCore text={demoText} demoMode={true} />}
					</div>
					<div className="column" style={{ maxWidth: "25em" }}>
						{<LoginForm />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
