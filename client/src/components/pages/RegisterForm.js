import { connect } from "react-redux";
import classnames from "classnames";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { registerUser } from "../../actions";

import React, { Component } from "react";

class RegisterForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			password: "",
			password2: "",
			errors: {},
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors,
			});
		}
	}

	static propTypes = {
		registerUser: PropTypes.func.isRequired,
		auth: PropTypes.object.isRequired,
		errors: PropTypes.object.isRequired,
	};

	changeHandler = (event) => {
		const value = event.target.value;
		// [event.target.name] is a dynamic key name (refers to the <input> prop "name")
		this.setState({
			...this.state,
			[event.target.name]: value,
		});
	};

	submitHandler = (event) => {
		event.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
		};
		this.props.registerUser(newUser, this.props.history);
	};

	renderErrors() {
		const errors = [];
		if (this.state.errors) {
			Object.keys(this.state.errors).forEach((key) => {
				const error = this.state.errors[key];
				errors.push(<li>{error}</li>);
			});
		}
		return errors;
	}

	render() {
		const errors = this.state.errors;
		const hasErrors = Object.entries(errors).length !== 0;
		return (
			<div style={{ textAlign: "center" }}>
				<form
					noValidate
					autoComplete="on"
					className="ui form"
					onSubmit={this.submitHandler}
				>
					<h4>Register for Free</h4>
					<div
						className={classnames("field", { error: errors.name })}
					>
						<input
							type="text"
							name="name"
							placeholder="name"
							required="required"
							onChange={this.changeHandler}
						/>
					</div>
					<div
						className={classnames("field", { error: errors.email })}
					>
						<input
							type="email"
							name="email"
							placeholder="email"
							required="required"
							onChange={this.changeHandler}
						/>
					</div>
					<div
						className={classnames("field", {
							error: errors.password,
						})}
					>
						<input
							type="password"
							name="password"
							placeholder="password"
							required="required"
							onChange={this.changeHandler}
						/>
					</div>
					<div
						className={classnames("field", {
							error: errors.password2,
						})}
					>
						<input
							type="password"
							name="password2"
							placeholder="confirm password"
							required="required"
							onChange={this.changeHandler}
						/>
					</div>
					<div
						style={{ textAlign: "left" }}
						className={classnames("ui negative message", {
							hidden: !hasErrors,
						})}
					>
						<ul>{this.renderErrors()}</ul>
					</div>
					<button className="ui orange button" type="submit">
						Register
					</button>
				</form>
				<br />
				Already have an account? <Link to="/login">Log in here.</Link>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		errors: state.errors,
	};
};

export default connect(mapStateToProps, { registerUser })(
	withRouter(RegisterForm)
);
