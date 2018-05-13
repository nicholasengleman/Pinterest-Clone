import React from 'react';
import "./Register.css";

import axios from 'axios';


class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			passwordConfirm: ''
		}
	}

	onSubmit = (event) => {
		console.log("test");
		event.preventDefault();
		axios.post('/register', {
			email: this.state.email,
			password: this.state.password
		})
			.then(function(response) {
				console.log(response);
			})
			.catch(function(error) {
				console.log(error);
			})
	};

	onInputChange = () => {
		this.setState({
			email: this.input.value,
			password: this.inputPassword.value,
			passwordConfirm: this.inputConfirmPaswword.value
		})
	};

	render() {
		return (
			<div className="loginForm">
				<h1>Register</h1>
				<form>
					<div className="instructions">
						<label htmlFor="email">Email:</label>
						<br />
						<label htmlFor="password">Password:</label>
						<br/>
						<label htmlFor="password-confirm">Confirm Password:</label>
					</div>
					<div className="formInput">
						<input name="email"
							   type="email"
							   id="email"
							   ref={input => (this.input = input)}
							   onChange={this.onInputChange}
							   value={this.state.email}/>
						<input name="password"
							   type="password"
							   id="password"
							   ref={input => (this.inputPassword = input)}
							   onChange={this.onInputChange}
							   value={this.state.password}/>
						<input name="password-confirm"
							   type="password" id="password"
							   ref={input => (this.inputConfirmPaswword = input)}
							   onChange={this.onInputChange}
							   value={this.state.passwordConfirm}/>
					</div>
					<button type="button" onClick={this.onSubmit}>Submit</button>
				</form>
			</div>
		)
	}
}

export default Register;