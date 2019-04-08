import React, { Component } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { loadExternalScript } from '../utils/externalScript'

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

const Navbar = ({ activeRoute }) => (
	<nav className="navbar navbar-dark navbar-transparent navbar-absolute ct-nav">
		<div className="container">
			<div className="navbar-header">
				<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
					<span className="sr-only">Toggle navigation</span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
				</button>
				<a className="navbar-brand ct-brand" href="/">Zooma.vn</a>
			</div>
			<div className="collapse navbar-collapse">
				<ul className="nav navbar-nav navbar-right">
					<li className={activeRoute === '/signup' ? "active" : ""}>
						<Link href="/signup">
							<a>
								<i className="material-icons">person_add</i> Sign Up
							</a>
						</Link>
					</li>
					<li className={activeRoute === '/signin' ? "active" : ""}>
						<Link href="/signin">
							<a>
								<i className="material-icons">fingerprint</i> Sign In
							</a>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
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


export default class AuthLayout extends Component {
	render() {
		const { title, activeRoute, children } = this.props;
		return (
			<div>
				<Header title={title} />
				<div className="_body">
					<Navbar activeRoute={activeRoute} />
					<div className="wrapper wrapper-full-page">
						<div className="full-page login-page">
							<div className="full-page-background ct-background"></div>
							<div className="content">
								<div className="container">
									<div className="row">
										<div className="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
											{children}
										</div>
									</div>
								</div>
							</div>
							<Footer />
						</div>
					</div>
				</div>
			</div>
		)
	}
}
