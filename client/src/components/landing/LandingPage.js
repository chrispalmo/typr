import React from "react";
import SignIn from "./SignIn";
import Demo from "./Demo";
import TyprCore from "../typr/TyprCore";
import TyprLiveWPM from "../typr/TyprLiveWPM";

const demoText =
	"Welcome to typr! Register for free to practice typing your favourite books, breaking news articles and unique, algorithmically-generated exercises designed to optimize your improvement. Customize content using the library-builder, track progress with detailed analytics, and 10x your learning efficiency while reading the things you want to be reading.";

const Landing = () => {
	return (
		<div
			className="ui one column centered grid middle aligned"
			style={{ height: "70vh" }}
		>
			<div className="ui one column centered grid middle aligned">
				<div className="ui two column centered row">
					<div className="column" style={{ maxWidth: "30em" }}>
						{<TyprCore text={demoText} />}
					</div>
					<div className="column" style={{ maxWidth: "25em" }}>
						{<SignIn />}
					</div>
				</div>
				<div className="column">{<TyprLiveWPM />}</div>
			</div>
		</div>
	);
};

export default Landing;
