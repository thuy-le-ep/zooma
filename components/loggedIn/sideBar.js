import Link from 'next/link'
import Menu from './menu'
import { getGreetingTime } from '../../utils'

const backgroundImg = {
	backgroundImage: 'url(/static/img/sidebar-2.jpg)'
}

const Sidebar = ({ user, activeRoute }) => (
	<div className="sidebar ct-sidebar" data-active-color="rose" data-background-color="white">
		<div className="logo">
			<Link href="/">
				<a className="simple-text">
					Zooma.vn
				</a>
			</Link>
		</div>
		<div className="logo logo-mini">
			<Link href="/">
				<a className="simple-text">
					ZM
				</a>
			</Link>
		</div>
		<div className="sidebar-wrapper">
			<div className="user">
				<div className="photo">
					<img src={user.photoURL} />
				</div>
				<div className="info">
					<a className="collapsed">
						Chào buổi {getGreetingTime()} {" ,"} {user.displayName} {"."}
					</a>
				</div>
			</div>
			<Menu
				activeRoute={activeRoute}
			/>
		</div>
		<div className="sidebar-background" style={backgroundImg}></div>
	</div>
)

export default Sidebar;
