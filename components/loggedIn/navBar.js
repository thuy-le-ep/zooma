import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { signOut } from '../../credentials/auth'
import firebase from '../../credentials/firebase.config'

export default class Navbar extends Component {

	handleSignOut() {
		firebase.auth().signOut().then(() => {
			signOut()
			Router.replace('/signin')
		}).catch(err => {
			console.log(err)
		})
	}

	render() {
		const { pageTitle } = this.props

		return (
			<nav className="navbar navbar-transparent navbar-absolute">
				<div className="container-fluid">
					<div className="navbar-minimize">
						<button id="minimizeSidebar" className="btn btn-round btn-white btn-fill btn-just-icon">
							<i className="material-icons visible-on-sidebar-regular">first_page</i>
							<i className="material-icons visible-on-sidebar-mini">last_page</i>
						</button>
					</div>
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<Link href="/">
							<a className="navbar-brand" > {pageTitle} </a>
						</Link>

					</div>
					<div className="collapse navbar-collapse">
						<ul className="nav navbar-nav navbar-right">
							<li>
								<a className="dropdown-toggle" data-toggle="dropdown">
									<i className="material-icons">dashboard</i>
									<p className="hidden-lg hidden-md">{pageTitle}</p>
								</a>
							</li>
							<li className="dropdown">
								<a className="dropdown-toggle" data-toggle="dropdown">
									<i className="material-icons">notifications</i>
									<span className="notification">5</span>
									<p className="hidden-lg hidden-md">
										Notifications
							<b className="caret"></b>
									</p>
								</a>
								<ul className="dropdown-menu">
									<li>
										<a href="#">Mike John responded to your email</a>
									</li>
									<li>
										<a href="#">You have 5 new tasks</a>
									</li>
									<li>
										<a href="#">You're now friend with Andrew</a>
									</li>
									<li>
										<a href="#">Another Notification</a>
									</li>
									<li>
										<a href="#">Another One</a>
									</li>
								</ul>
							</li>
							<li>
								<a href="#" onClick={this.handleSignOut} className="dropdown-toggle" data-toggle="dropdown" title="Sign Out">
									<i className="material-icons">power_settings_new</i>
									<p className="hidden-lg hidden-md">SignOut</p>
								</a>
							</li>
							<li className="separator hidden-lg hidden-md"></li>
						</ul>
						<form className="navbar-form navbar-right" role="search">
							<div className="form-group form-search is-empty">
								<input type="text" className="form-control" placeholder="Search" />
								<span className="material-input"></span>
							</div>
							<button type="submit" className="btn btn-white btn-round btn-just-icon">
								<i className="material-icons">search</i>
								<div className="ripple-container"></div>
							</button>
						</form>
					</div>
				</div>
			</nav>
		)
	}
}
