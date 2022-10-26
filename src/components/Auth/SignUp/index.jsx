import React from 'react';
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import CustomButton from '../../CustomButton';
import './style.scss';

const SignUp = () => {
	return (
		<div className='page-login'>
			<div className='auth-header'>
				<Container>
					<div className='d-flex justify-content-end align-items-center py-2'>
						<div className='me-2'>Don't have an account yet?</div>
						<NavLink to='auth' className='button-outline'>
							test
						</NavLink>
					</div>
				</Container>
			</div>
		</div>
	);
};

export default SignUp;
