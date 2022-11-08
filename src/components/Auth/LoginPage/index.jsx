import React, { useEffect } from 'react';
import authApi from '@api/authApi';
import LoginForm from '../LoginForm';
import style from '../Layout/style.module.scss';

const LoginPage = () => {
	const handleOnSubmit = async (data) => {
		const response = await authApi.login({ ...data });
	};

	useEffect(() => {
		document.title = 'Login With Us';
	}, []);

	return (
		<>
			<div className={style['page-auth__header']}></div>
			<div className={`${style['page-auth__main']} h-100 d-flex flex-column align-items-center`}>
				<div className='container'>
					<div className='row'>
						<div className='col-6 offset-3'>
							<LoginForm onSubmit={handleOnSubmit} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
