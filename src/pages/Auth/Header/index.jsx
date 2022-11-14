import React from 'react';
import { NavLink } from 'react-router-dom';
import { PATH_ROUTES } from '@/constant';

const { AUTH } = PATH_ROUTES;

const Header = () => {
	return (
		<div>
			<NavLink to={AUTH.LOGIN} className='button button-secondary'>
				Log in
			</NavLink>
			<NavLink to={AUTH.SIGN_UP} className='button'>
				Sign Up
			</NavLink>
		</div>
	);
};

export default Header;
