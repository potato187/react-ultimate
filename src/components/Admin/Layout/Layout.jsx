import React from 'react';
import { Outlet } from 'react-router-dom';
import NavSideBar from '../NavSideBar/NavSideBar';
import { useProSidebar } from 'react-pro-sidebar';
import { SIDEBAR_ROUTES } from '../Routes';
import './style.scss';
import ModalBase from '@/components/ModalBase/ModalBase';

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
