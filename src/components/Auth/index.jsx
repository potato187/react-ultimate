import NotificationBase from '@components/NotificationBase';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Layout from './Layout';

const Auth = () => {
	return (
		<>
			<Layout />
			<NotificationBase />
		</>
	);
};

export default Auth;
