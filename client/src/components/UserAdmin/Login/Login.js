import React from 'react';
import { withRouter } from 'react-router-dom';

import "./Login.css";

import axios from 'axios';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			status: ''
		};
	}

	onSubmit = (event) => {
		let a = this;
		event.preventDefault();
		axios.post('/api/login', {
				email: this.state.email,
				password: this.state.password
			})
			.then(function(response) {
				if(response.data.isAuth) {
					a.props.setUserData(response.data);
					a.props.history.push('/');
				} else {
					a.setState({status: response.data.message});
				}
			})
			.catch(function(error) {
				console.log(error);
			})
	};


	onInputChange = () => {
		this.setState({
			email: this.inputEmail.value,
			password: this.inputPassword.value,
		})
	};

	render() {
		return (
			<div className="loginForm">
				<h3>{this.state.status}</h3>
				<h1>Login</h1>
				<form>
					<div className="instructions">
						<label htmlFor="email">Email:</label>
						<br />
						<label htmlFor="password">Password:</label>
					</div>
					<div className="formInput">
						<input name="email"
							   type="email"
							   id="email"
							   ref={input => (this.inputEmail = input)}
							   onChange={this.onInputChange}
							   value={this.state.email}
						/>
						<input name="password"
							   type="password"
							   id="password"
							   ref={input => (this.inputPassword = input)}
							   onChange={this.onInputChange}
							   value={this.state.password}
						/>
					</div>
					<button type="button" onClick={this.onSubmit}>Submit</button>
				</form>
			</div>
		)
	}
}

export default withRouter(Login);