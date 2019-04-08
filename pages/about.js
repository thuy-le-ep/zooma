import React, { Component } from 'react'
import withAuth from '../utils/withAuth'
import Layout from '../components/loggedIn/layout'

const About = () => (
	<Layout
		title="About"
		activeRoute="/about"
	>
		<h1>This is About page</h1>
	</Layout>
)

export default withAuth(About);