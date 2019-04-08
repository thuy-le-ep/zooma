import React, { Component } from 'react'
import Router from 'next/router'
import providerFirebase from 'firebase/app'

import { setUser } from '../credentials/auth'
import firebase from '../credentials/firebase.config'

export default class AuthSocial extends Component {

	withGoogleAccount = () => {
		firebase.auth().signInWithPopup(new providerFirebase.auth.GoogleAuthProvider())
			.then(res => {
				setUser(res.user)
				Router.replace('/')
			})
			.catch(err => {
				this.props.handleError(err.message)
			})
	}

	withFacebookAccount = () => {
		firebase.auth().signInWithPopup(new providerFirebase.auth.FacebookAuthProvider())
			.then(res => {
				setUser(res.user)
				Router.replace('/')
			})
			.catch(err => {
				this.props.handleError(err.message)
			})
	}

	render() {
		return (
			<div className="social-line">
				<div className="social-line">
					<a onClick={this.withFacebookAccount} className="btn btn-just-icon btn-simple">
						<i className="fa fa-facebook-square"></i>
					</a>
					<a onClick={this.withGoogleAccount} className="btn btn-just-icon btn-simple">
						<i className="fa fa-google-plus"></i>
					</a>
				</div>
			</div>
		)
	}
}
