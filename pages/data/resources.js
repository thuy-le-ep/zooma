import React, { Component } from 'react'
import firebase from '../../credentials/firebase.config'
import 'firebase/firestore'
import withAuth from '../../utils/withAuth'
import Layout from '../../components/loggedIn/layout'

class Resources extends Component {
	state = {
		data: null,
		docs: {
			_for: '',
			type: '',
			price: '',
			projectName: '',
			numBedroom: '',
			location: '',
			date: '',
			area: '',
			id: '',
			ownerName: '',
			phone: '',
			comment: ''
		}
	}

	componentDidMount() {
		let db = firebase.firestore()
		let data = {}
		db.collection('resources').onSnapshot(querySnapshot => {
			querySnapshot.forEach(doc => data[doc.id] = doc.data())
			if (data) this.setState({ data })
		}, error => console.error(error))
	}

	handleChange = (e) => {
		let docs = { ...this.state.docs }
		docs[e.target.name] = e.target.value
		this.setState({ docs });
	}

	handleSubmit = (e) => {
		e.preventDefault()
		let db = firebase.firestore()
		let { docs } = this.state

		// Add data to firestore
		db.collection('resources').add(docs).then(docRef => {
			// Empty docs state
			this.setState({
				docs: { _for: '', type: '', price: '', projectName: '', numBedroom: '', location: '', date: '', area: '', id: '', ownerName: '', phone: '', comment: '' }
			})

			// Hide modal and show notification
			window.$('#addNewModal').modal('hide')
			window.demo.showNotification('top', 'right', 'Thêm thành công resources mới !', 'success')
		}).catch(err => {
			window.demo.showNotification('top', 'right', 'Có lỗi xảy ra. Vui lòng thử lại !', 'danger')
		})
	}

	render() {
		let { data, docs } = this.state
		let { _for, type, price, projectName, numBedroom, location, date, area, id, ownerName, phone, comment } = docs
		let validPhoneRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g
		let isInvalid = !validPhoneRegex.test(phone) || _for === '' || type === '' || price === '' || projectName === '' || numBedroom === '' || location === '' || date === '' || area === '' || id === '' || ownerName === ''

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
									<button className="btn btn-rose" data-toggle="modal" data-target="#addNewModal">
										<i className="material-icons">add</i>
										Thêm mới
										<div className="ripple-container"></div>
									</button>
								</div>
								<div className="modal fade ct-right" id="addNewModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
									<div className="modal-dialog">
										<div className="modal-content">
											<div className="modal-body">
												<div className="card">
													<form className="form-horizontal">
														<div className="card-header card-header-icon" data-background-color="purple">
															<i className="material-icons">note_add</i>
														</div>
														<div className="card-content">
															<h4 className="card-title">Thêm mới Resources</h4>
															<div className="row">
																<label className="col-sm-2 label-on-left ct-label">Loại hình:</label>
																<div className="col-sm-10">
																	<select
																		className="selectpicker"
																		data-style="select-with-transition"
																		title="--- Chọn loại hình ---"
																		data-size="7"
																		name="_for"
																		value={_for}
																		onChange={this.handleChange}
																	>
																		<option value="Cần bán">Cần bán</option>
																		<option value="Cần cho thuê">Cần cho thuê</option>
																		<option value="Cả hai">Cả hai</option>
																		<option value="Không có nhu cầu">Không có nhu cầu</option>
																	</select>
																</div>
															</div>

															<div className="row">
																<label className="col-sm-2 label-on-left  ct-label">Loại BĐS:</label>
																<div className="col-sm-10">
																	<select
																		className="selectpicker"
																		data-style="select-with-transition"
																		title="--- Chọn loại bđs ---"
																		data-size="7"
																		name="type"
																		value={type}
																		onChange={this.handleChange}
																	>
																		<option value="Nhà">Nhà</option>
																		<option value="Căn hộ">Căn hộ</option>
																		<option value="Villa">Villa</option>
																		<option value="Mặt bằng(Văn Phòng)">Mặt bằng(văn phòng)</option>
																	</select>
																</div>
															</div>

															<div className="row">
																<label className="col-sm-2 label-on-left">Tên dự án:</label>
																<div className="col-sm-10">
																	<div className="form-group label-floating is-empty">
																		<label className="control-label"></label>
																		<input className="text" className="form-control" name="projectName" value={projectName} onChange={this.handleChange} />
																		<span className="help-block">Ví dụ Masteri Thảo Điền, Millennium...</span>
																	</div>
																</div>
															</div>

															<div className="row">
																<label className="col-sm-2 label-on-left">Giá:</label>
																<div className="col-sm-4">
																	<div className="form-group label-floating is-empty">
																		<label className="control-label"></label>
																		<input type="text" className="form-control" name="price" value={price} onChange={this.handleChange} />
																		<span className="help-block">Giá chính xác hoặc khoảng giá.</span>
																	</div>
																</div>
																<label className="col-sm-2 label-on-left">Số phòng ngủ:</label>
																<div className="col-sm-4">
																	<div className="form-group label-floating is-empty">
																		<label className="control-label"></label>
																		<input type="number" className="form-control" name="numBedroom" value={numBedroom} onChange={this.handleChange} />
																		<span className="help-block">1,2,3,4...</span>
																	</div>
																</div>
															</div>

															<div className="row">
																<label className="col-sm-2 label-on-left">Diện tích:</label>
																<div className="col-sm-4">
																	<div className="form-group label-floating is-empty">
																		<label className="control-label"></label>
																		<input type="text" className="form-control" name="area" value={area} onChange={this.handleChange} />
																		<span className="help-block">Diện tích cụ thể hoặc khoảng diện tích (m2)</span>
																	</div>
																</div>
																<label className="col-sm-2 label-on-left">Mã căn hộ:</label>
																<div className="col-sm-4">
																	<div className="form-group label-floating is-empty">
																		<label className="control-label"></label>
																		<input type="text" className="form-control" name="id" value={id} onChange={this.handleChange} />
																		<span className="help-block">Ví dụ A15.02</span>
																	</div>
																</div>
															</div>

															<div className="row">
																<label className="col-sm-2 label-on-left">Chủ căn hộ:</label>
																<div className="col-sm-4">
																	<div className="form-group label-floating is-empty">
																		<label className="control-label"></label>
																		<input type="text" className="form-control" name="ownerName" value={ownerName} onChange={this.handleChange} />
																		<span className="help-block">Ví dụ Nguyễn Văn A</span>
																	</div>
																</div>
																<label className="col-sm-2 label-on-left">SĐT:</label>
																<div className="col-sm-4">
																	<div className="form-group label-floating is-empty">
																		<label className="control-label"></label>
																		<input type="tel" className="form-control" pattern="(09|03|07|08|05)+([0-9]{8})" name="phone" value={phone} onChange={this.handleChange} />
																		<span className="help-block">0123456789</span>
																	</div>
																</div>
															</div>

															<div className="row">
																<label className="col-sm-2 label-on-left">Khu vực:</label>
																<div className="col-sm-10">
																	<div className="form-group label-floating is-empty">
																		<label className="control-label"></label>
																		<input type="text" className="form-control" name="location" value={location} onChange={this.handleChange} />
																		<span className="help-block">Ví dụ quận 1, quận 2, quận 3...</span>
																	</div>
																</div>
															</div>

															<div className="row">
																<label className="col-sm-2 label-on-left">Ngày hiệu lực:</label>
																<div className="col-sm-10">
																	<div className="form-group label-floating is-empty">
																		<label className="control-label"></label>
																		<input type="text" className="form-control" name="date" value={date} onChange={this.handleChange} />
																		<span className="help-block">Khoảng thời gian có nhu cầu . ví dụ từ : 03/2018 đến 12/2018 ; từ tháng 10/2018 đến mãi mãi</span>
																	</div>
																</div>
															</div>

															<div className="row">
																<label className="col-sm-2 label-on-left">Comment</label>
																<div className="col-sm-10">
																	<div className="form-group label-floating is-empty">
																		<label className="control-label"></label>
																		<textarea rows="4" className="form-control ct-textarea " name="comment" value={comment} onChange={this.handleChange} ></textarea>
																	</div>
																</div>
															</div>

														</div>
													</form>
												</div>
											</div>
											<div className="modal-footer">
												<button type="button" type="submit" className="btn btn-info" disabled={isInvalid} onClick={this.handleSubmit}> <i className="material-icons">save</i>  Lưu lại</button>
												<button type="button" className="btn btn-danger" data-dismiss="modal"><i className="material-icons">clear</i>Hủy</button>
											</div>
										</div>
									</div>
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
																<th width="8%">Loại hình<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
																<th width="8%">Loại BĐS<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
																<th width="5%">Giá<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
																<th width="10%">Tên dự án<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
																<th width="8%">Số phòng ngủ<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
																<th width="10%">Khu vực<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
																<th width="10%">Ngày hiệu lực<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
																<th width="8%">Diện tích<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
																<th width="8%">Mã căn hộ<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
																<th width="8%">Chủ căn hộ<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
																<th width="5%">SĐT<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
																<th width="12%">Comments<i aria-hidden="true" className="fa fa-sort float-right"></i></th>
															</tr>
														</thead>
														<tbody>
															{data && Object.keys(data).map(key => (
																<tr key={key}>
																	<td>{data[key]._for}</td>
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
			</Layout >
		)
	}
}

export default withAuth(Resources);