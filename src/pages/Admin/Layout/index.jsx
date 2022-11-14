import {useProSidebar} from 'react-pro-sidebar';
import {Outlet} from 'react-router-dom';
import {SIDEBAR_ROUTES} from '../Routes';
import style from './style.module.scss';
import NavSideBar from "../components/NavSideBar";

const Layout = () => {
	const { collapseSidebar } = useProSidebar();

	return (
		<div className={style['admin']}>
			<div className={style['admin-header']}></div>
			<div className={style['admin-container']}>
				<div className={style['admin-sidebar']}>
					<NavSideBar routes={SIDEBAR_ROUTES} />
				</div>
				<div className={style['admin-main']}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Layout;
