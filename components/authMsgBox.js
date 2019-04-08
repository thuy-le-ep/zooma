import React, { Component } from 'react'
export default class MsgBox extends Component {
	render() {
		return (
			<div>
				{this.props.errMsg ?
					(
						<p className="category text-center text-danger">
							{this.props.errMsg}
						</p>
					) : (
						<p className="category text-center">
							Vui lòng điền vào thông tin đăng nhập của bạn
						</p>
					)
				}
			</div>
		)
	}
}