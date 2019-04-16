import React, { Component } from 'react'
import 'firebase/firestore'
import firebase from '../../credentials/firebase.config'
import withAuth from '../../utils/withAuth'
import Layout from '../../components/loggedIn/layout'
import { NEW_DOC_STRUCTURE, sliceArr, searchArr, sortArr, validPhone } from '../../utils/helper'

const resourcesRef = firebase.firestore().collection('resources')

class Resources extends Component {
	state = {
		fullData: [],
		renderData: [],
		currentPage: 1,
		rowsPerPage: 10,
		searchQuery: '',
		sortBy: 'asc',
		sortOn: '_for',
		doc: NEW_DOC_STRUCTURE
	}

	componentDidMount() {
		let { sortBy, sortOn } = this.state
		let fullData = []
		resourcesRef.orderBy(sortOn, sortBy).onSnapshot(querySnapshot => {
			querySnapshot.forEach(doc => { fullData.push(doc.data()) })
			if (fullData) this.setState({ fullData, renderData: fullData })
		}, error => console.error)
	}

	// ===========> Add form functions
	handleChangeFieldAddForm = (e) => {
		let doc = { ...this.state.doc }
		e.target.name === 'numBedroom' ? doc[e.target.name] = parseInt(e.target.value) : doc[e.target.name] = e.target.value.toString()
		this.setState({ doc })
	}

	handleSubmitAddFrom = (e) => {
		e.preventDefault()
		let { doc } = this.state

		resourcesRef.add(doc).then(docRef => {
			window.demo.showNotification('top', 'right', 'Thêm thành công resources mới !', 'success')
			window.$('#addNewModal').modal('hide')
			this.setState({ doc: NEW_DOC_STRUCTURE })
		}).catch(err => {
			window.demo.showNotification('top', 'right', 'Có lỗi xảy ra. Vui lòng thử lại!', 'danger')
		})
	}

	// ===========> Table functions
	handleSearchTable = (e) => {
		let { fullData, sortOn, sortBy } = this.state
		let searchQuery = e.target.value.toLowerCase()
		let searchData = searchQuery !== '' ? searchArr(fullData, searchQuery) : fullData
		let renderData = sortArr(searchData, sortOn, sortBy)
		this.setState({ renderData, searchQuery, currentPage: 1 })
	}

	handleChangeRowsPerPage = (e) => {
		let rowsPerPage = parseInt(e.target.value.toString())
		this.setState({ rowsPerPage })
	}

	handleSortTable = (e) => {
		let { fullData, searchQuery, sortBy, sortOn } = this.state
		let field = e.target.getAttribute('data-field').toString()
		let tmpSortBy = field === sortOn && sortBy === 'asc' ? 'desc' : 'asc'
		let searchData = searchQuery !== '' ? searchArr(fullData, searchQuery) : fullData
		let renderData = sortArr(searchData, field, tmpSortBy)
		tmpSortBy === 'asc' ? e.target.className = 'fa fa-sort-asc float-right ct-pointer ct-active' : e.target.className = 'fa fa-sort-desc float-right ct-pointer ct-active'
		this.setState({ renderData, sortOn: field, sortBy: tmpSortBy })
	}

	// ===========> Pagination table
	handleChangePage = (e) => {
		let currentPage = parseInt(e.target.id)
		this.setState({ currentPage })
	}

	render() {
		let { renderData, doc, currentPage, rowsPerPage, sortOn, sortBy } = this.state
		let { _for, type, price, projectName, numBedroom, location, date, area, id, ownerName, phone, comment } = doc
		let isInvalid = !validPhone(phone) || _for === '' || type === '' || price === '' || projectName === '' || numBedroom === '' || location === '' || date === '' || area === '' || id === '' || ownerName === ''

		// ===========> Logic for displaying docs
		const indexOfLastTodo = currentPage * rowsPerPage
		const indexOfFirstTodo = indexOfLastTodo - rowsPerPage
		const currentDocs = renderData.length > 0 ? renderData.slice(indexOfFirstTodo, indexOfLastTodo) : []
		const pageNumbers = []
		for (let i = 1; i <= Math.ceil(renderData.length / rowsPerPage); i++) {
			pageNumbers.push(i)
		}

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
								<div className="modal fade ct-right" id="addNewModal" tabIndex="-1" role="dialog" aria-hidden="true">
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
																<label className="col-sm-2 label-on-left">Loại hình:</label>
																<div className="col-sm-10">
																	<div className="form-group">
																		<select
																			className="form-control"
																			name="_for"
																			value={_for}
																			onChange={this.handleChangeFieldAddForm}
																		>
																			<option disabled value=''>Chọn loại hình</option>
																			<option value="Cần bán">Cần bán</option>
																			<option value="Cần cho thuê">Cần cho thuê</option>
																			<option value="Cả hai">Cả hai</option>
																			<option value="Không có nhu cầu">Không có nhu cầu</option>
																		</select>
																	</div>
																</div>
															</div>

															<div className="row">
																<label className="col-sm-2 label-on-left">Loại BĐS:</label>
																<div className="col-sm-10">
																	<div className="form-group">
																		<select
																			className="form-control"
																			name="type"
																			value={type}
																			onChange={this.handleChangeFieldAddForm}
																		>
																			<option disabled value=''>Chọn loại bất động sản</option>
																			<option value="Nhà">Nhà</option>
																			<option value="Căn hộ">Căn hộ</option>
																			<option value="Villa">Villa</option>
																			<option value="Mặt bằng(Văn Phòng)">Mặt bằng(văn phòng)</option>
																		</select>
																	</div>
																</div>
															</div>

															<div className="row">
																<label className="col-sm-2 label-on-left">Tên dự án:</label>
																<div className="col-sm-10">
																	<div className="form-group label-floating is-empty">
																		<label className="control-label"></label>
																		<input className="text" className="form-control" name="projectName" value={projectName} onChange={this.handleChangeFieldAddForm} />
																		<span className="help-block">Ví dụ Masteri Thảo Điền, Millennium...</span>
																	</div>
																</div>
															</div>

															<div className="row">
																<label className="col-sm-2 label-on-left">Giá:</label>
																<div className="col-sm-4">
																	<div className="form-group label-floating is-empty">
																		<label className="control-label"></label>
																		<input type="text" className="form-control" name="price" value={price} onChange={this.handleChangeFieldAddForm} />
																		<span className="help-block">Giá chính xác hoặc khoảng giá.</span>
																	</div>
																</div>
																<label className="col-sm-2 label-on-left">Số phòng ngủ:</label>
																<div className="col-sm-4">
																	<div className="form-group label-floating is-empty">
																		<label className="control-label"></label>
																		<input type="number" className="form-control" name="numBedroom" value={numBedroom} onChange={this.handleChangeFieldAddForm} />
																		<span className="help-block">1,2,3,4...</span>
																	</div>
																</div>
															</div>

															<div className="row">
																<label className="col-sm-2 label-on-left">Diện tích:</label>
																<div className="col-sm-4">
																	<div className="form-group label-floating is-empty">
																		<label className="control-label"></label>
																		<input type="text" className="form-control" name="area" value={area} onChange={this.handleChangeFieldAddForm} />
																		<span className="help-block">Diện tích cụ thể hoặc khoảng diện tích (m2)</span>
																	</div>
																</div>
																<label className="col-sm-2 label-on-left">Mã căn hộ:</label>
																<div className="col-sm-4">
																	<div className="form-group label-floating is-empty">
																		<label className="control-label"></label>
																		<input type="text" className="form-control" name="id" value={id} onChange={this.handleChangeFieldAddForm} />
																		<span className="help-block">Ví dụ A15.02</span>
																	</div>
																</div>
															</div>

															<div className="row">
																<label className="col-sm-2 label-on-left">Chủ căn hộ:</label>
																<div className="col-sm-4">
																	<div className="form-group label-floating is-empty">
																		<label className="control-label"></label>
																		<input type="text" className="form-control" name="ownerName" value={ownerName} onChange={this.handleChangeFieldAddForm} />
																		<span className="help-block">Ví dụ Nguyễn Văn A</span>
																	</div>
																</div>
																<label className="col-sm-2 label-on-left">SĐT:</label>
																<div className="col-sm-4">
																	<div className="form-group label-floating is-empty">
																		<label className="control-label"></label>
																		<input type="tel" className="form-control" pattern="(09|03|07|08|05)+([0-9]{8})" name="phone" value={phone} onChange={this.handleChangeFieldAddForm} />
																		<span className="help-block">0123456789</span>
																	</div>
																</div>
															</div>

															<div className="row">
																<label className="col-sm-2 label-on-left">Khu vực:</label>
																<div className="col-sm-10">
																	<div className="form-group label-floating is-empty">
																		<label className="control-label"></label>
																		<input type="text" className="form-control" name="location" value={location} onChange={this.handleChangeFieldAddForm} />
																		<span className="help-block">Ví dụ quận 1, quận 2, quận 3...</span>
																	</div>
																</div>
															</div>

															<div className="row">
																<label className="col-sm-2 label-on-left">Ngày hiệu lực:</label>
																<div className="col-sm-10">
																	<div className="form-group label-floating is-empty">
																		<label className="control-label"></label>
																		<input type="text" className="form-control" name="date" value={date} onChange={this.handleChangeFieldAddForm} />
																		<span className="help-block">Khoảng thời gian có nhu cầu . ví dụ từ : 03/2018 đến 12/2018 ; từ tháng 10/2018 đến mãi mãi</span>
																	</div>
																</div>
															</div>

															<div className="row">
																<label className="col-sm-2 label-on-left">Comment</label>
																<div className="col-sm-10">
																	<div className="form-group label-floating is-empty">
																		<label className="control-label"></label>
																		<textarea rows="4" className="form-control ct-textarea " name="comment" value={comment} onChange={this.handleChangeFieldAddForm} ></textarea>
																	</div>
																</div>
															</div>

														</div>
													</form>
												</div>
											</div>
											<div className="modal-footer">
												<button type="button" type="submit" className="btn btn-info" disabled={isInvalid} onClick={this.handleSubmitAddFrom}> <i className="material-icons">save</i>  Lưu lại</button>
												<button type="button" className="btn btn-danger" data-dismiss="modal"><i className="material-icons">clear</i>Hủy</button>
											</div>
										</div>
									</div>
								</div>
								<div className="material-datatables">
									<div className="dataTables_wrapper dt-bootstrap4">
										<div className="row">
											<div className="col-sm-12 col-md-6">
												<div className="dataTables_length bs-select">
													<label>Show
													<div className="form-group">
															<select
																className="custom-select custom-select-sm form-control form-control-sm"
																onChange={this.handleChangeRowsPerPage}
																value={rowsPerPage}
															>
																<option value="10">10</option>
																<option value="1">1</option>
																<option value="50">50</option>
																<option value="100">100</option>
																<option value="999999">All</option>
															</select>
															<span className="material-input"></span>
														</div>
													</label>
												</div>
											</div>
											<div className="col-sm-12 col-md-6">
												<div className="dataTables_filter">
													<label>
														Search
														<div className="form-group is-empty">
															<input type="search"
																className="form-control form-control-sm" placeholder="Search" onChange={this.handleSearchTable} />
															<span className="material-input"></span>
														</div>
													</label>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-sm-12">
												<div className="table-responsive">
													<table entries="10" className="table table-bordered table-hover table-striped dataTable">
														<thead>
															<tr>
																<th width="8%" className="form-inline ct-form-inline">
																	<select value="false" className="form-control ct-form-select">
																		<option disabled value="false">Loại hình</option>
																	</select>
																	<i aria-hidden="true" data-field='_for' className={`fa ${sortOn === '_for' ? 'ct-active' : 'fa-sort'} ${sortOn === '_for' && 'fa-sort-' + sortBy} float-right ct-pointer`} onClick={this.handleSortTable}></i>
																</th>
																<th width="8%" className="form-inline ct-form-inline">
																	<select value="false" className="form-control ct-form-select">
																		<option disabled value="false">Loại BĐS</option>
																	</select>
																	<i aria-hidden="true" data-field='type' className={`fa ${sortOn === 'type' ? 'ct-active' : 'fa-sort'} ${sortOn === 'type' && 'fa-sort-' + sortBy} float-right ct-pointer`} onClick={this.handleSortTable}></i>
																</th>
																<th width="5%" className="form-inline ct-form-inline">
																	<select value="false" className="form-control ct-form-select">
																		<option disabled value="false">Giá</option>
																	</select>
																	<i aria-hidden="true" data-field='price' className={`fa ${sortOn === 'price' ? 'ct-active' : 'fa-sort'} ${sortOn === 'price' && 'fa-sort-' + sortBy} float-right ct-pointer`} onClick={this.handleSortTable}></i>
																</th>
																<th width="10%" className="form-inline ct-form-inline">
																	<select value="false" className="form-control ct-form-select">
																		<option disabled value="false">Tên dự án</option>
																	</select>
																	<i aria-hidden="true" data-field='projectName' className={`fa ${sortOn === 'projectName' ? 'ct-active' : 'fa-sort'} ${sortOn === 'projectName' && 'fa-sort-' + sortBy} float-right ct-pointer`} onClick={this.handleSortTable}></i>
																</th>
																<th width="8%" className="form-inline ct-form-inline">
																	<select value="false" className="form-control ct-form-select">
																		<option disabled value="false">Phòng ngủ</option>
																	</select>
																	<i aria-hidden="true" data-field='numBedroom' className={`fa ${sortOn === 'numBedroom' ? 'ct-active' : 'fa-sort'} ${sortOn === 'numBedroom' && 'fa-sort-' + sortBy} float-right ct-pointer`} onClick={this.handleSortTable}></i>
																</th>
																<th width="10%" className="form-inline ct-form-inline">
																	<select value="false" className="form-control ct-form-select">
																		<option disabled value="false">Khu vực</option>
																	</select>
																	<i aria-hidden="true" data-field='location' className={`fa ${sortOn === 'location' ? 'ct-active' : 'fa-sort'} ${sortOn === 'location' && 'fa-sort-' + sortBy} float-right ct-pointer`} onClick={this.handleSortTable}></i>
																</th>
																<th width="10%" className="form-inline ct-form-inline">
																	<select value="false" className="form-control ct-form-select">
																		<option disabled value="false">Hiệu lực</option>
																	</select>
																	<i aria-hidden="true" data-field='date' className={`fa ${sortOn === 'date' ? 'ct-active' : 'fa-sort'} ${sortOn === 'date' && 'fa-sort-' + sortBy} float-right ct-pointer`} onClick={this.handleSortTable}></i>
																</th>
																<th width="8%" className="form-inline ct-form-inline">
																	<select value="false" className="form-control ct-form-select">
																		<option disabled value="false">Diện tích</option>
																	</select>
																	<i aria-hidden="true" data-field='area' className={`fa ${sortOn === 'area' ? 'ct-active' : 'fa-sort'} ${sortOn === 'area' && 'fa-sort-' + sortBy} float-right ct-pointer`} onClick={this.handleSortTable}></i>
																</th>
																<th width="8%" className="form-inline ct-form-inline">
																	<select value="false" className="form-control ct-form-select">
																		<option disabled value="false">Mã căn hộ</option>
																	</select>
																	<i aria-hidden="true" data-field='id' className={`fa ${sortOn === 'id' ? 'ct-active' : 'fa-sort'} ${sortOn === 'id' && 'fa-sort-' + sortBy} float-right ct-pointer`} onClick={this.handleSortTable}></i>
																</th>
																<th width="8%" className="form-inline ct-form-inline">
																	<select value="false" className="form-control ct-form-select">
																		<option disabled value="false">Chủ căn hộ</option>
																	</select>
																	<i aria-hidden="true" data-field='ownerName' className={`fa ${sortOn === 'ownerName' ? 'ct-active' : 'fa-sort'} ${sortOn === 'ownerName' && ('fa-sort-' + sortBy)} float-right ct-pointer`} onClick={this.handleSortTable}></i>
																</th>
																<th width="5%" className="form-inline ct-form-inline">
																	<select value="false" className="form-control ct-form-select">
																		<option disabled value="false">SĐT</option>
																	</select>
																	<i aria-hidden="true" data-field='phone' className={`fa ${sortOn === 'phone' ? 'ct-active' : 'fa-sort'} ${sortOn === 'phone' && 'fa-sort-' + sortBy} float-right ct-pointer`} onClick={this.handleSortTable}></i>
																</th>
																<th width="12%">
																	Comments
																</th>
															</tr>
														</thead>
														<tbody>
															{currentDocs && currentDocs.map((doc, key) => (
																<tr key={key}>
																	<td>{doc['_for']}</td>
																	<td>{doc['type']}</td>
																	<td>{doc['price']}</td>
																	<td>{doc['projectName']}</td>
																	<td>{doc['numBedroom']}</td>
																	<td>{doc['location']}</td>
																	<td>{doc['date']}</td>
																	<td>{doc['area']}</td>
																	<td>{doc['id']}</td>
																	<td>{doc['ownerName']}</td>
																	<td>{doc['phone']}</td>
																	<td>{doc['comment']}</td>
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
												<div className="dataTables_info" role="status" aria-live="polite">Showing {indexOfFirstTodo + 1} to {indexOfLastTodo} of {renderData && renderData.length} entries</div>
											</div>
											<div className="col-sm-12 col-md-7">
												<div className="dataTables_paginate">
													<ul className="pagination">
														<li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}><a aria-label="Previous" className="page-link ct-pointer" onClick={this.handleChangePage}><span id={currentPage - 1}>Previous</span></a></li>
														{pageNumbers.length > 0 && pageNumbers.map((page, index) => (
															<li key={index} className={`page-item ${currentPage === page ? 'active' : ''}`}><a className="page-link ct-pointer" onClick={this.handleChangePage} id={page}>{page}</a></li>
														))}
														<li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}><a aria-label="Next" className="page-link ct-pointer" onClick={this.handleChangePage}><span id={currentPage + 1}>Next</span></a></li>
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
