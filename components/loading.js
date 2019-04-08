import React, { Component } from 'react'

export default class Loading extends Component {
	render() {
		return (
			<div>
				<div className="lds-ripple"><div></div><div></div></div>
				<style jsx>{`
						.lds-ripple {
							display: inline-block;
							position: absolute;
							top: 50%;
							left: 50%;
							margin-top: -50px;
							margin-left: -50px;
							width: 64px;
							height: 64px;
						}
						.lds-ripple div {
							position: absolute;
							border: 4px solid red;
							opacity: 1;
							border-radius: 50%;
							animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
						}
						.lds-ripple div:nth-child(2) {
							animation-delay: -0.5s;
						}
						@keyframes lds-ripple {
							0% {
							top: 28px;
							left: 28px;
							width: 0;
							height: 0;
							opacity: 1;
							}
							100% {
							top: -1px;
							left: -1px;
							width: 58px;
							height: 58px;
							opacity: 0;
							}
						}
					`}</style>
			</div>
		)
	}
}
