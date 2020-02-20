import {Link} from "react-router-dom";
import React, { Component } from "react";

class RegisterForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
    	username: '',
    	email: '',
    	password: '' 
  	}	
  }

  changeHandler = (event) => {
  	const value = event.target.value;
  	// [event.target.name] is a dynamic key name (refers to the <input> prop "name")
  	this.setState({
  		...this.state,
  		[event.target.name]: value
  	});
    console.log(this.state)

  }

  submitHandler = (event) => {
    event.preventDefault();
    alert("You are submitting " + this.state);
  }
	
	render() {
		return (
			<div style={{ textAlign: "center"}}>
				<form
					autocomplete="on"
					className="ui form"
					onSubmit={this.submitHandler}
				>
					<h4 class="ui dividing header">Register for Free</h4>
				  <div className="field">
				    <input 
				    	type="text" 
				    	name="username" 
				    	placeholder="username" 
				    	required="required"
				    	onChange={this.changeHandler}
				    />
			  	</div>
				  <div className="field">
				    <input
				    	type="email"
				    	name="email"
				    	placeholder="email"
				    	required="required"
				    	onChange={this.changeHandler}
				    />
				  </div>
				  <div className="field">
				    <input
				    	type="password"
				    	name="password"
				    	placeholder="password"
				    	required="required"
				    	onChange={this.changeHandler}
				    />
				  </div>	
				  <button
				  	type="submit"
				  	className="ui yellow button"
				  	type="submit"
				  >
				  	Register
				  </button>
				</form>		
				<br/>
				Already have an account? <Link to="/login">Log in here.</Link>
			</div>
		);
	}
}

export default RegisterForm;
