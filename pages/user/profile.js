import React, { Component } from 'react'
import withAuth from '../../utils/withAuth'
import Layout from '../../components/loggedIn/layout'

class UserProfile extends Component {
	render() {
		return (
			<Layout
				title="User Profile"
				activeRoute="/user/profile"
			>
				<div className="row">
					<div className="col-md-8">
						<div className="card">
							<div className="card-header card-header-icon" data-background-color="rose">
								<i className="material-icons">perm_identity</i>
							</div>
							<div className="card-content">
								<h4 className="card-title">Edit Profile -
									<small className="category"> Complete your profile</small>
								</h4>
								<form>
									<div className="row">
										<div className="col-md-5">
											<div className="form-group label-floating is-empty">
												<label className="control-label">Company (disabled)</label>
												<input type="text" className="form-control" disabled />
												<span className="material-input"></span></div>
										</div>
										<div className="col-md-3">
											<div className="form-group label-floating is-empty">
												<label className="control-label">Username</label>
												<input type="text" className="form-control" />
												<span className="material-input"></span></div>
										</div>
										<div className="col-md-4">
											<div className="form-group label-floating is-empty">
												<label className="control-label">Email address</label>
												<input type="email" className="form-control" />
												<span className="material-input"></span></div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6">
											<div className="form-group label-floating is-empty">
												<label className="control-label">Fist Name</label>
												<input type="text" className="form-control" />
												<span className="material-input"></span></div>
										</div>
										<div className="col-md-6">
											<div className="form-group label-floating is-empty">
												<label className="control-label">Last Name</label>
												<input type="text" className="form-control" />
												<span className="material-input"></span></div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-12">
											<div className="form-group label-floating is-empty">
												<label className="control-label">Adress</label>
												<input type="text" className="form-control" />
												<span className="material-input"></span></div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-4">
											<div className="form-group label-floating is-empty">
												<label className="control-label">City</label>
												<input type="text" className="form-control" />
												<span className="material-input"></span></div>
										</div>
										<div className="col-md-4">
											<div className="form-group label-floating is-empty">
												<label className="control-label">Country</label>
												<input type="text" className="form-control" />
												<span className="material-input"></span></div>
										</div>
										<div className="col-md-4">
											<div className="form-group label-floating is-empty">
												<label className="control-label">Postal Code</label>
												<input type="text" className="form-control" />
												<span className="material-input"></span></div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-12">
											<div className="form-group">
												<label>About Me</label>
												<div className="form-group label-floating is-empty">
													<label className="control-label"> Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.</label>
													<textarea className="form-control" rows="5"></textarea>
													<span className="material-input"></span></div>
											</div>
										</div>
									</div>
									<button type="submit" className="btn btn-rose pull-right">Update Profile</button>
									<div className="clearfix"></div>
								</form>
							</div>
						</div>
					</div>
					<div className="col-md-4">
						<div className="card card-profile">
							<div className="card-avatar">
								<a href="#pablo">
									<img className="img" src="../static/img/placeholder.jpg" />
								</a>
							</div>
							<div className="card-content">
								<h6 className="category text-gray">CEO / Co-Founder</h6>
								<h4 className="card-title">Alec Thompson</h4>
								<p className="description">
									Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
					</p>
								<a href="#pablo" className="btn btn-rose btn-round">Follow</a>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		)
	}
}

export default withAuth(UserProfile);