import React from 'react';
import { useProSidebar } from 'react-pro-sidebar';
import { Outlet } from 'react-router-dom';
import NavSideBar from '../NavSideBar/NavSideBar';
import { SIDEBAR_ROUTES } from '../Routes';
import './style.scss';

const Layout = () => {
	const { collapseSidebar } = useProSidebar();

	return (
		<div className='admin'>
			<div className='admin-header'></div>
			<div className='admin-container'>
				<div className='admin-sidebar'>
					<NavSideBar routes={SIDEBAR_ROUTES} />
				</div>
				<div className='admin-main'>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Layout;
