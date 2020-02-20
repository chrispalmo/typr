import React from "react";
import LoginForm from "./LoginForm";
import Demo from "./Demo";
import TyprCore from "../typr/TyprCore";
import TyprLiveWPM from "../typr/TyprLiveWPM";

const demoText = "Welcome back.";

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
				<div className="column">{<TyprLiveWPM />}</div>
			</div>
		</div>
	);
};

export default Landing;
