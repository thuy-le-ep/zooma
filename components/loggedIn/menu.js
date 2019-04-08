import React, { Component } from 'react'
import Link from 'next/link'

export default class Menu extends Component { 

	state = {
		collapseBtnStatus: false
	}

	componentDidMount() {
		let collapseBtnStatus = document.body.className !== 'sidebar-mini'
		this.setState({
			collapseBtnStatus
		})
	}

	render() {
		let {activeRoute} = this.props
		let {collapseBtnStatus} = this.state

		return (
			<ul className="nav">
				<li className={activeRoute === '/' ? "active" : ""}>
					<Link href="/">
						<a>
							<i className="material-icons">dashboard</i>
							<p>Dashboard</p>
						</a>
					</Link>
				</li>

				<li className={activeRoute === '/about' ? "active" : ""}>
					<Link href="/about">
						<a>
							<i className="material-icons">looks</i>
							<p>About</p>
						</a>
					</Link>
				</li>

				<li className={(activeRoute === '/user/profile' || activeRoute === '/user/setting') ? "active" : ""}>
					<a data-toggle="collapse" href="#userRelevant" aria-expanded={(activeRoute === '/user/profile' || activeRoute === '/user/setting')}>
						<i className="material-icons">account_box</i>
						<p>
							User<b className="caret"></b>
						</p>
					</a>
					<div className={(activeRoute === '/user/profile' || activeRoute === '/user/setting') && collapseBtnStatus ? "collapse in" : "collapse"} id="userRelevant">
						<ul className="nav">
							<li className={activeRoute === '/user/profile' ? "active" : ""}>
								<Link href="/user/profile">
									<a>Profile</a>
								</Link>
							</li>
							<li className={activeRoute === '/user/setting' ? "active" : ""}>
								<Link href="/user/setting">
									<a>Setting</a>
								</Link>
							</li>
						</ul>
					</div>
				</li>

				<li className={(activeRoute === '/data/resources' || activeRoute === '/data/customers') ? "active" : ""}>
					<a data-toggle="collapse" href="#dataRelevant" aria-expanded={(activeRoute === '/data/resources' || activeRoute === '/data/customers')}>
						<i className="material-icons">bubble_chart</i>
						<p>
							Data<b className="caret"></b>
						</p>
					</a>
					<div className={(activeRoute === '/data/resources' || activeRoute === '/data/customers') && collapseBtnStatus ? "collapse in" : "collapse"} id="dataRelevant">
						<ul className="nav">
							<li className={activeRoute === '/data/resources' ? "active" : ""}>
								<Link href="/data/resources">
									<a>Resources</a>
								</Link>
							</li>
							<li className={activeRoute === '/data/customers' ? "active" : ""}>
								<Link href="/data/customers">
									<a>Customers</a>
								</Link>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		)
	}
}
