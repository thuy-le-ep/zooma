import React, { Component } from 'react'
import Router from 'next/router'
import { loggedIn } from '../credentials/auth'
import Loading from '../components/loading'

export default function withAuth(AuthComponent) {
	return class Authenticated extends Component {

		state = {
			isLoading: true
		}

		componentDidMount() {
			if (!loggedIn()) {
				Router.replace('/signin');
			} else {
				this.setState({ isLoading: false });
			}
		}

		render() {
			return (
				<div>
					{
						this.state.isLoading ?
							(
								<Loading />
							) : (
								<AuthComponent {...this.props} />
							)
					}
				</div>
			)
		}
	}
}