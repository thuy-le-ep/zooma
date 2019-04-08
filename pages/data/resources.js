import React, { Component } from 'react'
import firebase from '../../credentials/firebase.config'
import 'firebase/firestore'
import withAuth from '../../utils/withAuth'
import Layout from '../../components/loggedIn/layout'

class Resources extends Component {
	state = {
		data: null
	}

	componentDidMount() {
		let db = firebase.firestore()
		let data = {}
		db.collection('resources').onSnapshot(querySnapshot => {
			querySnapshot.forEach(doc => data[doc.id] = doc.data())
			if (data) this.setState({ data })
		}, error => console.error(error))
	}

	render() {
		let { data } = this.state
		console.log(data)
		return (
			<Layout
				title="Resources"
				activeRoute="/data/resources"
			>
				<div className="row">
					<div className="col-md-12">
						<div className="card">
							<div className="card-header card-header-icon" data-background-color="purple">
								<i className="material-icons">assignment</i>
							</div>
							<div className="card-content">
								<h4 className="card-title">Resources</h4>
								<div className="toolbar ct-toolbar">
									<button className="btn btn-rose">
										<i className="material-icons">add</i>
										Add
										<div className="ripple-container"></div>
									</button>
								</div>
								<div className="material-datatables">
									<div className="dataTables_wrapper dt-bootstrap4">
										<div className="row">
											<div className="col-sm-12 col-md-6">
												<div className="dataTables_length bs-select"><label>Show<div className="form-group"><select
													className="custom-select custom-select-sm form-control form-control-sm">
													<option value="10">10</option>
													<option value="20">20</option>
													<option value="50">50</option>
													<option value="100">100</option>
												</select><span className="material-input"></span></div></label></div>
											</div>
											<div className="col-sm-12 col-md-6">
												<div className="dataTables_filter"><label>Search<div className="form-group is-empty"><input type="search"
													className="form-control form-control-sm" placeholder="Search" /><span
														className="material-input"></span></div></label></div>
											</div>
										</div>
										<div className="row">
											<div className="col-sm-12">
												<div className="table-responsive">
													<table entries="10" className="table table-bordered table-hover table-striped dataTable">
														<thead>
															<tr>
																<th>Loại hình<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
																<th>Loại BĐS<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
																<th>Giá<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
																<th>Tên dự án<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
																<th>Số phòng ngủ<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
																<th>Khu vực<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
																<th>Ngày hiệu lực<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
																<th>Diện tích<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
																<th>Mã căn hộ<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
																<th>Chủ căn hộ<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
																<th>SĐT<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
																<th>Comments<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
															</tr>
														</thead>
														<tbody>
															{data && Object.keys(data).map(key => (
																<tr key={key}>
																	<td>{data[key].for}</td>
																	<td>{data[key].type}</td>
																	<td>{data[key].price}</td>
																	<td>{data[key].projectName}</td>
																	<td>{data[key].numBedroom}</td>
																	<td>{data[key].location}</td>
																	<td>{data[key].date}</td>
																	<td>{data[key].area}</td>
																	<td>{data[key].id}</td>
																	<td>{data[key].ownerName}</td>
																	<td>{data[key].phone}</td>
																	<td>{data[key].comment}</td>
																</tr>
															))}
														</tbody>
														<thead>
															<tr>
																<th>Loại hình</th>
																<th>Loại BĐS</th>
																<th>Giá</th>
																<th>Tên dự án</th>
																<th>Số phòng ngủ</th>
																<th>Khu vực</th>
																<th>Ngày hiệu lực</th>
																<th>Diện tích</th>
																<th>Mã căn hộ</th>
																<th>Chủ căn hộ</th>
																<th>SĐT</th>
																<th>Comments</th>
															</tr>
														</thead>
													</table>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-sm-12 col-md-5">
												<div className="dataTables_info" role="status" aria-live="polite">Showing 1 to 4 of 4 entries</div>
											</div>
											<div className="col-sm-12 col-md-7">
												<div className="dataTables_paginate">
													<ul className="pagination">
														<li className="page-item disabled"><a aria-label="Previous"
															className="page-link page-link"><span>Previous</span></a></li>
														<li className="page-item active"><a className="page-link page-link">1 <span
															className="sr-only">(current)</span></a></li>
														<li className="page-item disabled"><a aria-label="Next"
															className="page-link page-link"><span>Next</span></a></li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		)
	}
}

export default withAuth(Resources);