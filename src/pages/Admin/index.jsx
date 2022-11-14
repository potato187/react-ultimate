import React from 'react';
import {ProSidebarProvider} from 'react-pro-sidebar';
import NotificationBase from "@components/NotificationBase";
import Layout from './Layout';

const index = () => {
	return (
		<ProSidebarProvider>
			<Layout />
			<NotificationBase />
		</ProSidebarProvider>
	);
};

export default index;
