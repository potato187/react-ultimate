import React from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import NotificationBase from '../NotificationBase';
import Layout from './Layout/Layout';

const index = () => {
	return (
		<ProSidebarProvider>
			<Layout />
			<NotificationBase />
		</ProSidebarProvider>
	);
};

export default index;
