import {Link} from "react-router-dom";
import React, { Component } from "react";

class LoginForm extends Component {
	render() {
		return (
			<div style={{ textAlign: "center"}}>
				<form action="#" method="POST" autocomplete="on" className="ui form">
					<h4 class="ui dividing header">Log In</h4>
				  <div className="field">
				    <input type="email" name="email" placeholder="email" required="required"/>
				  </div>
				  <div className="field">
				    <input type="password" name="password" placeholder="password" required="required"/>
				  </div>
				  <button type="submit" className="ui yellow button" type="submit">Log In</button>
				</form>					      	
				<br/>
				Need an account? <Link to="/register">Register for free here.</Link>
			</div>
		);
	}
}

export default LoginForm;
