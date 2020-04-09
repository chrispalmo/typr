import React, { Component } from "react";
import { connect } from "react-redux";
import { clearFlashMessage } from "../../actions"
import RegisterForm from "./RegisterForm";
import TyprCore from "../typr/TyprCore";
import TyprLiveWPM from "../typr/TyprLiveWPM";

const demoText = "Welcome to typr.";

class Landing extends Component {
	componentDidMount() {
		this.props.clearFlashMessage()
	}

	render() {
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
							{<RegisterForm />}
						</div>
					</div>
					<div className="column">{<TyprLiveWPM />}</div>
				</div>
			</div>
		)
	}
};

const mapStateToProps = state => {
  return { state }
}

export default connect(
  mapStateToProps,
  {
    clearFlashMessage
  }
)(Landing);
