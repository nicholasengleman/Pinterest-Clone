import React from 'react';
import ReactModal from "react-modal";
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {Heading, Text, Button} from 'gestalt';


import 'gestalt/dist/gestalt.css';
import './LoginRegisterModal.css';

class LoginRegisterModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			logInEmail: '',
			logInPassword: '',
			signUpEmail: '',
			signUpPassword: '',
			statusSignIn: '',
			statusCreateAccount: ''
		};
	}

	closeModal = () => {
		this.setState({logInEmail: '',
			logInPassword: '',
			signUpEmail: '',
			signUpPassword: '',
			statusSignIn: '',
			statusCreateAccount: ''
		});
		this.props.toggleLoginRegisterModal();
	};

	onSignIn = (event) => {
		let a = this;
		event.event.preventDefault();
		axios.post('/api/login', {
			email: this.state.logInEmail,
			password: this.state.logInPassword
		})
			.then(function (response) {
				if (response.data.isAuth) {
					a.props.setUserData(response.data);
					a.props.history.push('/');
				} else {
					a.setState({statusSignIn: response.data.message});
				}
			})
			.catch(function (error) {
				console.log(error);
			})
	};

	onSignUp = (event) => {
		let a = this;
		event.event.preventDefault();
		axios.post('/api/register', {
			email: this.state.signUpEmail,
			password: this.state.signUpPassword
		})
			.then(function (response) {
				if (response.data.isAuth) {
					a.props.history.push('/');
				} else {
					a.setState({statusCreateAccount: response.data.message});
				}
			})
			.catch(function (error) {
				console.log(error);
			})
	};


	onInputChange = () => {
		this.setState({
			logInEmail: this.logInEmail.value,
			logInPassword: this.logInPassword.value,
			signUpEmail: this.signUpEmail.value,
			signUpPassword: this.signUpPassword.value
		})
	};

	render() {
		return (
			<ReactModal
				isOpen={this.props.isOpen}
				onRequestClose={this.closeModal}
				className="loginRegisterModal"
				overlayClassName="Overlay"
				contentLabel="Login/Register Modal"
			>
				<header className='loginRegisterModal__header'>
					<Heading size="xs" color="red">Welcome to <br/>Pinterest Clone</Heading>
					<br/>
					<Text size="md" align="center" color="gray">Find and comment on products you like.</Text>
					<Text size="md" align="center" color="gray">Save to boards products you like the most</Text>
				</header>
				<div className="loginRegisterModal__loginForm">
					<div className="loginRegisterModal__loginForm_error">{this.state.statusSignIn}</div>
					<input name="email"
						   type="email"
						   ref={input => (this.logInEmail = input)}
						   onChange={this.onInputChange}
						   value={this.state.logInEmail}
						   placeholder="enter your email"
					/>
					<input name="password"
						   type="password"
						   ref={input => (this.logInPassword = input)}
						   onChange={this.onInputChange}
						   value={this.state.logInPassword}
						   placeholder="enter your password"

					/>
					<Button text="Sign In"
							onClick={this.onSignIn}
							color="red"
					/>
					<h3>or</h3>
					<div className="loginRegisterModal__loginForm_error">{this.state.statusCreateAccount}</div>
					<input name="email"
						   type="email"
						   ref={input => (this.signUpEmail = input)}
						   onChange={this.onInputChange}
						   value={this.state.signUpEmail}
						   placeholder="enter your email"
					/>
					<input name="password"
						   type="password"
						   ref={input => (this.signUpPassword = input)}
						   onChange={this.onInputChange}
						   value={this.state.signUpPassword}
						   placeholder="create a password"

					/>
					<Button text="Create Account"
							onClick={this.onSignUp}
							color="blue"
					/>


				</div>
			</ReactModal>
		)
	}
}

export default withRouter(LoginRegisterModal);