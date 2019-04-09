import React, { Component } from 'react'
import Head from 'next/head'
import SideBar from './sideBar'
import Navbar from './navBar'
import { loadExternalScript } from '../../utils/externalScript'
import { getCurrentUser } from '../../credentials/auth'

const Header = ({ title }) => (
	<Head>
		<meta charSet="utf-8" />
		<link rel="icon" type="image/png" href="../static/img/favicon.png" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<title>Zooma.vn - {title}</title>
		<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
		<meta name="viewport" content="width=device-width" />
		<link href="../static/css/bootstrap.min.css" rel="stylesheet" />
		<link href="../static/css/material-dashboard.css" rel="stylesheet" />
		<link href="../static/css/demo.css" rel="stylesheet" />
		<link href="../static/css/font-awesome.css" rel="stylesheet" />
		<link href="../static/css/google-roboto-300-700.css" rel="stylesheet" />
	</Head>
)

class Footer extends Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
	}

	async componentDidMount() {
		const { childNodes } = this.myRef.current;
		if (childNodes.length === 0) {
			await loadExternalScript(this.myRef.current)
		}
	}

	render() {
		return (
			<footer className="footer ct-footer">
				<div className="container-fluid">
					<p className="copyright pull-right">
						&copy;
						{new Date().getFullYear()} {" "}
						Development by <a href="#">ThuyKaka</a>.
					</p>
				</div>
				<div ref={this.myRef}></div>
			</footer>
		)
	}
}

export default class Layout extends Component {
	render() {
		const { title, activeRoute, children } = this.props
		const currentUser = getCurrentUser()

		return (
			<div>
				<Header title={title} />
				<div className="wrapper">
					<SideBar
						user={currentUser}
						activeRoute={activeRoute}
					/>
					<div className="main-panel">
						<Navbar
							pageTitle={title}
						/>
						<div className="content">
							<div className="container-fluid">
								{children}
							</div>
						</div>
						<Footer />
					</div>
				</div>
			</div>
		)
	}
}
