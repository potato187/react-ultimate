import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Layout from './Layout';

const Auth = () => {
	return (
		<div className='page-auth'>
			<Layout />
		</div>
	);
};

export default Auth;
