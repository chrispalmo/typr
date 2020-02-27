import { connect } from "react-redux";
import classnames from "classnames"
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types"

import { loginUser } from "../../actions";

import React, { Component } from "react";

class LoginForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
    	email: '',
    	password: '',
    	errors: {}
  	}	
  };

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push("/dashboard")
		}
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  static propTypes = {
  	loginUser: PropTypes.func.isRequired,
	  auth: PropTypes.object.isRequired,
	  errors: PropTypes.object.isRequired
  }

  changeHandler = event => {
  	const value = event.target.value;
  	// [event.target.name] is a dynamic key name (refers to the <input> prop "name")
  	this.setState({
  		...this.state,
  		[event.target.name]: value
  	});
  }

  submitHandler = event => {
    event.preventDefault();
	  const userData = {
	    email: this.state.email,
	    password: this.state.password,
	  };
	  this.props.loginUser(userData);
  }

  renderErrors() {
  	const errors = [];
  	if (this.state.errors) {
			Object.keys(this.state.errors).forEach(key => {
				const error = this.state.errors[key];
				errors.push(<li>{error}</li>);
			});
  	}
  	return errors
  }
	
	render() {
		const errors = this.state.errors;
		const hasErrors = (Object.entries(errors).length != 0)
		return (
			<div style={{ textAlign: "center"}}>
				<form
					noValidate
					autoComplete="on"
					className="ui form"
					onSubmit={this.submitHandler}
				>
					<h4>Log In</h4>
				  <div className={classnames(
				  	"field", 
				  	{error: errors.email}
				  )}>
				    <input
				    	type="email"
				    	name="email"
				    	placeholder="email"
				    	required="required"
				    	onChange={this.changeHandler}
				    />
				  </div>
				  <div className={classnames(
				  	"field", 
				  	{error: errors.password}
				  )}>
				    <input
				    	type="password"
				    	name="password"
				    	placeholder="password"
				    	required="required"
				    	onChange={this.changeHandler}
				    />
				  </div>	
					<div 
						style={{ textAlign: "left"}}
						className={classnames(
							"ui negative message",
							{hidden: !hasErrors}
						)}
					>
						<ul>
							{this.renderErrors()}
						</ul>
					</div>
				  <button
				  	type="submit"
				  	className="ui yellow button"
				  	type="submit"
				  >
				  	Log In
				  </button>
				</form>		
				<br/>
				Need an account? <Link to="/register">Register for free here.</Link>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
	  auth: state.auth,
	  errors: state.errors
	}
};

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(LoginForm));
