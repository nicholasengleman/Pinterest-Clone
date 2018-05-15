import React from 'react';
import ReactModal from "react-modal";
import {withRouter} from 'react-router-dom';
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
			signUpName: '',
			signUpPassword: '',
			statusSignIn: '',
			statusCreateAccount: ''
		};
	}

	closeModal = () => {
		this.setState({
			logInEmail: '',
			logInPassword: '',
			signUpEmail: '',
			signUpName: '',
			signUpPassword: '',
			statusSignIn: '',
			statusCreateAccount: ''
		});
		this.props.toggleLoginRegisterModal();
	};

	onSignIn = (event) => {
		let a = this;
		event.event.preventDefault();
		fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify({
				email: this.state.logInEmail,
				password: this.state.logInPassword
			}),
			credentials: 'include',
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then(res => res.json())
			.catch(error => console.log('Error: ', error))
			.then(response => {
				if (response.isAuth) {
					a.props.setUserData(response);
					a.props.toggleLoginRegisterModal();
					a.props.history.push('/');
				} else {
					a.setState({statusSignIn: response.message});
				}
			})
	};


	onSignUp = (event) => {
		if(this.validateEmail(this.state.signUpEmail)) {
			let a = this;
			event.event.preventDefault();
			fetch('/api/register', {
				method: 'POST',
				body: JSON.stringify({
					email: this.state.signUpEmail,
					firstName: this.state.signUpName,
					password: this.state.signUpPassword
				}),
				credentials: 'include',
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			}).then(res => res.json())
				.then(response => {
					console.log(response);
					if (response.success) {
						a.props.setUserData(response);
						a.props.toggleLoginRegisterModal();
						a.props.history.push('/');
					} else {
						console.log(response.error.message);
						a.setState({statusCreateAccount: response.error.message});
					}
				})
		} else {
			this.setState({statusCreateAccount: "Email is not in a valid format"});
		}
	};

	 validateEmail = (email) => {
		const re = /\S+@\S+\.\S+/;
		return re.test(email);
	};


	onInputChange = () => {
		this.setState({
			logInEmail: this.logInEmail.value,
			logInPassword: this.logInPassword.value,
			signUpEmail: this.signUpEmail.value,
			signUpName: this.signUpName.value,
			signUpPassword: this.signUpPassword.value
		});
		if (!this.logInEmail.value || !this.logInPassword.value) {
			this.setState({statusSignIn: ''});
		}
		if (!this.signUpEmail.value || !this.signUpPassword.value) {
			this.setState({statusCreateAccount: ''});
		}
	};

	render() {
		return (
			<ReactModal
				isOpen={this.props.isOpen}
				onRequestClose={this.closeModal}
				className="loginRegisterModal"
				overlayClassName="Overlay"
				contentLabel="Login/Register Modal"
				bodyOpenClassName="ReactModal__Body--open"
			>
				<header className='loginRegisterModal__header'>
					<Heading size="xs" color="red">Welcome to <br/>Pinterest Clone</Heading>
					<br/>
					<Text size="md" align="center" color="gray">Find and comment on products you like.</Text>
					<Text size="md" align="center" color="gray">Save to boards the products you like the most.</Text>
				</header>
				<div className="loginRegisterModal__loginForm_error">{this.state.statusSignIn}</div>
				<div className="loginRegisterModal__loginForm">
					<input name="email"
						   type="email"
						   ref={input => (this.logInEmail = input)}
						   onChange={this.onInputChange}
						   value={this.state.logInEmail}
						   placeholder="enter your email"
						   required
					/>
					<input name="password"
						   type="password"
						   ref={input => (this.logInPassword = input)}
						   onChange={this.onInputChange}
						   value={this.state.logInPassword}
						   placeholder="enter your password"
						   required
					/>
					<Button text="Sign In"
							onClick={this.onSignIn}
							color="red"
					/>
					<h3>or</h3>
					<input name="email"
						   type="email"
						   ref={input => (this.signUpEmail = input)}
						   onChange={this.onInputChange}
						   value={this.state.signUpEmail}
						   placeholder="enter your email"
						   required
					/>
					<input name="name"
						   type="text"
						   ref={input => (this.signUpName = input)}
						   onChange={this.onInputChange}
						   value={this.state.signUpName}
						   placeholder="enter a first name"
						   required
					/>
					<input name="password"
						   type="password"
						   ref={input => (this.signUpPassword = input)}
						   onChange={this.onInputChange}
						   value={this.state.signUpPassword}
						   placeholder="create a password"
						   required
					/>
					<Button text="Create Account"
							onClick={this.onSignUp}
							color="blue"
					/>
				</div>
				<div className="loginRegisterModal__loginForm_error">{this.state.statusCreateAccount}</div>
			</ReactModal>
		)
	}
}

export default withRouter(LoginRegisterModal);