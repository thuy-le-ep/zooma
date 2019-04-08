import React, { Component } from 'react'
import withAuth from '../../utils/withAuth'
import Layout from '../../components/loggedIn/layout'

class UserSetting extends Component {
	render() {
		return (
			<Layout
				title="User Setting"
				activeRoute="/user/setting"
			>
				<h1>This is User Setting page</h1>
			</Layout>
		)
	}
}

export default withAuth(UserSetting);