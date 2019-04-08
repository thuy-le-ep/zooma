import React, { Component } from 'react'
import withAuth from '../utils/withAuth'
import Layout from '../components/loggedIn/layout'

class Index extends Component {
	render() {
		return (
			<Layout
				title="Trang Chủ"
				activeRoute="/"
			>
				<h1>This is Index page</h1>
			</Layout>
		)
	}
}

export default withAuth(Index);
