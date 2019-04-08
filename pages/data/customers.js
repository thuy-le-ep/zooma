import React, { Component } from 'react'
import 'firebase/firestore'
import firebase from '../../credentials/firebase.config'
import withAuth from '../../utils/withAuth'
import Layout from '../../components/loggedIn/layout'
import { loadScript } from '../../utils/externalScript'

class Customers extends Component {
	state = {
		messages: null
	}

	componentDidMount() {
		var db = firebase.firestore()

		db.collection('test').onSnapshot(
			querySnapshot => {
				var messages = {}
				querySnapshot.forEach(function (doc) {
					messages[doc.id] = doc.data()
				})
				if (messages) console.log(messages)
			},
			error => {
				console.error(error)
			}
		)

		// setTimeout(async () => {
		// 	var childNodes = document.getElementsByClassName('initTable')
		// 	if (childNodes.length === 0) {
		// 		await loadScript('/static/js/jquery.datatables.js')
		// 		await loadScript('/static/js/initTable.js', 'initTable')
		// 	}
		// }, 100)
	}

	render() {
		return (
			<Layout
				title="Customers"
				activeRoute="/data/customers"
			>
				<div className="row">
					<div className="col-md-12">
						<div className="card">
							<div className="card-header card-header-icon" data-background-color="purple">
								<i className="material-icons">assignment</i>
							</div>
							<div className="card-content">
								<h4 className="card-title">Customers</h4>
								<div className="toolbar ct-toolbar">
									<button className="btn btn-rose">
										<i className="material-icons">add</i>
										Add
										<div className="ripple-container"></div>
									</button>
								</div>
								<div className="material-datatables">
									<table id="datatables" className="table table-striped table-no-bordered table-hover" cellSpacing="0"
										width="100%">
										<thead>
											<tr>
												<th>For</th>
												<th>Types</th>
												<th>Price</th>
												<th>Name</th>
												<th>Bedroom</th>
												<th>Position</th>
												<th>Date</th>
												<th>Area</th>
												<th>HouseId</th>
												<th>HouseOwner</th>
												<th>Phone</th>
												<th>Others</th>
												<th className="disabled-sorting text-right">Actions</th>
											</tr>
										</thead>
										<tfoot>
											<tr>
												<th>For</th>
												<th>Types</th>
												<th>Price</th>
												<th>Name</th>
												<th>Bedroom</th>
												<th>Position</th>
												<th>Date</th>
												<th>Area</th>
												<th>HouseId</th>
												<th>HouseOwner</th>
												<th>Phone</th>
												<th>Others</th>
												<th className="text-right">Actions</th>
											</tr>
										</tfoot>
										<tbody>
											<tr>
												<td>For Rent</td>
												<td>Căn hộ</td>
												<td>6tỷ1</td>
												<td>HJK</td>
												<td>1</td>
												<td>Quận 2</td>
												<td>03/2018 đến 12/2018</td>
												<td>500m2</td>
												<td>A15.02</td>
												<td>HỒ THANH THỤY</td>
												<td>0908272757</td>
												<td>22tr KBP, full NT, 4,65 tỷ</td>
												<td className="text-right">
													<a href="#" className="btn btn-simple btn-info btn-icon like"><i
														className="material-icons">favorite</i></a>
													<a href="#" className="btn btn-simple btn-warning btn-icon edit"><i
														className="material-icons">dvr</i></a>
													<a href="#" className="btn btn-simple btn-danger btn-icon remove"><i
														className="material-icons">close</i></a>
												</td>
											</tr>
											<tr>
												<td>For Rent 2</td>
												<td>Căn hộ 2</td>
												<td>6tỷ1</td>
												<td>HJK</td>
												<td>2</td>
												<td>Quận 2</td>
												<td>03/2018 đến 12/2018</td>
												<td>500m2</td>
												<td>A15.02</td>
												<td>HỒ THANH THỤY 2</td>
												<td>0908272757</td>
												<td>22tr KBP, full NT, 4,65 tỷ</td>
												<td className="text-right">
													<a href="#" className="btn btn-simple btn-info btn-icon like"><i
														className="material-icons">favorite</i></a>
													<a href="#" className="btn btn-simple btn-warning btn-icon edit"><i
														className="material-icons">dvr</i></a>
													<a href="#" className="btn btn-simple btn-danger btn-icon remove"><i
														className="material-icons">close</i></a>
												</td>
											</tr>
											<tr>
												<td>For Rent 3</td>
												<td>Căn hộ 3</td>
												<td>6tỷ1</td>
												<td>HJK</td>
												<td>3</td>
												<td>Quận 2</td>
												<td>03/2018 đến 12/2018</td>
												<td>500m2</td>
												<td>A15.02</td>
												<td>HỒ THANH THỤY 3</td>
												<td>0908272757</td>
												<td>22tr KBP, full NT, 4,65 tỷ</td>
												<td className="text-right">
													<a href="#" className="btn btn-simple btn-info btn-icon like"><i
														className="material-icons">favorite</i></a>
													<a href="#" className="btn btn-simple btn-warning btn-icon edit"><i
														className="material-icons">dvr</i></a>
													<a href="#" className="btn btn-simple btn-danger btn-icon remove"><i
														className="material-icons">close</i></a>
												</td>
											</tr>
											<tr>
												<td>For Rent 4</td>
												<td>Căn hộ 4</td>
												<td>6tỷ1</td>
												<td>HJK</td>
												<td>4</td>
												<td>Quận 2</td>
												<td>03/2018 đến 12/2018</td>
												<td>500m2</td>
												<td>A15.02</td>
												<td>HỒ THANH THỤY 4</td>
												<td>0908272757</td>
												<td>22tr KBP, full NT, 4,65 tỷ</td>
												<td className="text-right">
													<a href="#" className="btn btn-simple btn-info btn-icon like"><i
														className="material-icons">favorite</i></a>
													<a href="#" className="btn btn-simple btn-warning btn-icon edit"><i
														className="material-icons">dvr</i></a>
													<a href="#" className="btn btn-simple btn-danger btn-icon remove"><i
														className="material-icons">close</i></a>
												</td>
											</tr>
											<tr>
												<td>For Rent 5</td>
												<td>Căn hộ 5</td>
												<td>6tỷ1</td>
												<td>HJK</td>
												<td>5</td>
												<td>Quận 2</td>
												<td>03/2018 đến 12/2018</td>
												<td>500m2</td>
												<td>A15.02</td>
												<td>HỒ THANH THỤY 5</td>
												<td>0908272757</td>
												<td>22tr KBP, full NT, 4,65 tỷ</td>
												<td className="text-right">
													<a href="#" className="btn btn-simple btn-info btn-icon like"><i
														className="material-icons">favorite</i></a>
													<a href="#" className="btn btn-simple btn-warning btn-icon edit"><i
														className="material-icons">dvr</i></a>
													<a href="#" className="btn btn-simple btn-danger btn-icon remove"><i
														className="material-icons">close</i></a>
												</td>
											</tr>
											<tr>
												<td>For Rent 6</td>
												<td>Căn hộ 6</td>
												<td>6tỷ1</td>
												<td>HJK</td>
												<td>6</td>
												<td>Quận 2</td>
												<td>03/2018 đến 12/2018</td>
												<td>500m2</td>
												<td>A15.02</td>
												<td>HỒ THANH THỤY 6</td>
												<td>0908272757</td>
												<td>22tr KBP, full NT, 4,65 tỷ</td>
												<td className="text-right">
													<a href="#" className="btn btn-simple btn-info btn-icon like"><i
														className="material-icons">favorite</i></a>
													<a href="#" className="btn btn-simple btn-warning btn-icon edit"><i
														className="material-icons">dvr</i></a>
													<a href="#" className="btn btn-simple btn-danger btn-icon remove"><i
														className="material-icons">close</i></a>
												</td>
											</tr>
											<tr>
												<td>For Rent 7</td>
												<td>Căn hộ 7</td>
												<td>6tỷ1</td>
												<td>HJK</td>
												<td>7</td>
												<td>Quận 2</td>
												<td>03/2018 đến 12/2018</td>
												<td>500m2</td>
												<td>A15.02</td>
												<td>HỒ THANH THỤY 7</td>
												<td>0908272757</td>
												<td>22tr KBP, full NT, 4,65 tỷ</td>
												<td className="text-right">
													<a href="#" className="btn btn-simple btn-info btn-icon like"><i
														className="material-icons">favorite</i></a>
													<a href="#" className="btn btn-simple btn-warning btn-icon edit"><i
														className="material-icons">dvr</i></a>
													<a href="#" className="btn btn-simple btn-danger btn-icon remove"><i
														className="material-icons">close</i></a>
												</td>
											</tr>
											<tr>
												<td>For Rent 8</td>
												<td>Căn hộ 8</td>
												<td>6tỷ1</td>
												<td>HJK</td>
												<td>8</td>
												<td>Quận 2</td>
												<td>03/2018 đến 12/2018</td>
												<td>500m2</td>
												<td>A15.02</td>
												<td>HỒ THANH THỤY 8</td>
												<td>0908272757</td>
												<td>22tr KBP, full NT, 4,65 tỷ</td>
												<td className="text-right">
													<a href="#" className="btn btn-simple btn-info btn-icon like"><i
														className="material-icons">favorite</i></a>
													<a href="#" className="btn btn-simple btn-warning btn-icon edit"><i
														className="material-icons">dvr</i></a>
													<a href="#" className="btn btn-simple btn-danger btn-icon remove"><i
														className="material-icons">close</i></a>
												</td>
											</tr>
											<tr>
												<td>For Rent 9</td>
												<td>Căn hộ 7</td>
												<td>6tỷ1</td>
												<td>HJK</td>
												<td>9</td>
												<td>Quận 2</td>
												<td>03/2018 đến 12/2018</td>
												<td>500m2</td>
												<td>A15.02</td>
												<td>HỒ THANH THỤY 9</td>
												<td>0908272757</td>
												<td>22tr KBP, full NT, 4,65 tỷ</td>
												<td className="text-right">
													<a href="#" className="btn btn-simple btn-info btn-icon like"><i
														className="material-icons">favorite</i></a>
													<a href="#" className="btn btn-simple btn-warning btn-icon edit"><i
														className="material-icons">dvr</i></a>
													<a href="#" className="btn btn-simple btn-danger btn-icon remove"><i
														className="material-icons">close</i></a>
												</td>
											</tr>
											<tr>
												<td>For Rent 10</td>
												<td>Căn hộ 10</td>
												<td>6tỷ1</td>
												<td>HJK</td>
												<td>10</td>
												<td>Quận 2</td>
												<td>03/2018 đến 12/2018</td>
												<td>500m2</td>
												<td>A15.02</td>
												<td>HỒ THANH THỤY 10</td>
												<td>0908272757</td>
												<td>22tr KBP, full NT, 4,65 tỷ</td>
												<td className="text-right">
													<a href="#" className="btn btn-simple btn-info btn-icon like"><i
														className="material-icons">favorite</i></a>
													<a href="#" className="btn btn-simple btn-warning btn-icon edit"><i
														className="material-icons">dvr</i></a>
													<a href="#" className="btn btn-simple btn-danger btn-icon remove"><i
														className="material-icons">close</i></a>
												</td>
											</tr>
											<tr>
												<td>For Rent 11</td>
												<td>Căn hộ 11</td>
												<td>6tỷ1</td>
												<td>HJK</td>
												<td>11</td>
												<td>Quận 2</td>
												<td>03/2018 đến 12/2018</td>
												<td>500m2</td>
												<td>A15.02</td>
												<td>HỒ THANH THỤY 11</td>
												<td>0908272757</td>
												<td>22tr KBP, full NT, 4,65 tỷ</td>
												<td className="text-right">
													<a href="#" className="btn btn-simple btn-info btn-icon like"><i
														className="material-icons">favorite</i></a>
													<a href="#" className="btn btn-simple btn-warning btn-icon edit"><i
														className="material-icons">dvr</i></a>
													<a href="#" className="btn btn-simple btn-danger btn-icon remove"><i
														className="material-icons">close</i></a>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		)
	}
}

export default withAuth(Customers);