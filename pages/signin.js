import React, { Component } from 'react'
import Router from 'next/router'

import firebase from '../credentials/firebase.config'
import { loggedIn, setUser } from '../credentials/auth'

import AuthLayout from '../components/authLayout'
import AuthSocial from '../components/authSocial'
import MsgBox from '../components/authMsgBox'
import Loading from '../components/loading'

export default class SignIn extends Component {

	state = {
		email: '',
		password: '',
		error: null,
		cardClassName: 'card card-login card-hidden',
		isLoading: true
	}

	componentDidMount() {
		if (loggedIn()) {
			// redirect if you're already logged in
			Router.replace('/')
		} else {
			this.setState({ isLoading: false });
			setTimeout(() => {
				this.setState({ cardClassName: 'card card-login' })
			}, 300);
		}
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleError = (error) => {
		this.setState({ error })
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { email, password } = this.state;
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(res => {
				setUser(res.user)
				Router.replace('/')
			})
			.catch(err => {
				this.setState({ 'error': err.message });
			})
	};

	render() {
		const { email, password, cardClassName, error, isLoading } = this.state;

		return (
			<div>
				{isLoading ? (
					<Loading />
				) : (
						<AuthLayout
							title="Sign In"
							activeRoute="/signin"
						>
							<form
								onSubmit={this.handleSubmit}
							>
								<div className={cardClassName}>
									<div className="card-header text-center" data-background-color="rose">
										<h4 className="card-title">Sign In</h4>
										<AuthSocial handleError={this.handleError} />
									</div>

									<MsgBox errMsg={error} />

									<div className="card-content">
										<div className="input-group">
											<span className="input-group-addon">
												<i className="material-icons">email</i>
											</span>
											<div className="form-group label-floating">
												<label className="control-label">Email address</label>
												<input
													type="email"
													className="form-control"
													name="email"
													value={email}
													onChange={this.handleChange}
												/>
											</div>
										</div>
										<div className="input-group">
											<span className="input-group-addon">
												<i className="material-icons">lock_outline</i>
											</span>
											<div className="form-group label-floating">
												<label className="control-label">Password</label>
												<input
													type="password"
													className="form-control"
													name="password"
													value={password}
													onChange={this.handleChange}
												/>
											</div>
										</div>
									</div>
									<div className="footer text-center">
										<button type="submit" className="btn btn-rose btn-simple btn-wd btn-lg">Let's go</button>
									</div>
								</div>
							</form>
						</AuthLayout>
					)
				}
			</div>
		)
	}
}
