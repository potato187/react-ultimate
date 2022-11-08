import React from 'react';
import { useProSidebar } from 'react-pro-sidebar';
import { Outlet } from 'react-router-dom';
import NavSideBar from '../NavSideBar/NavSideBar';
import { SIDEBAR_ROUTES } from '../Routes';
import  style from './style.module.scss';

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
