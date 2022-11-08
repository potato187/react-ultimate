import React, { useEffect } from 'react';
import authApi from '@api/authApi';
import RegisterForm from '../RegisterForm';
import style from '../Layout/style.module.scss';

const RegisterPage = () => {
	const handleOnSubmit = async (data) => {
		const response = await authApi.register({ ...data });
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
							<RegisterForm onSubmit={handleOnSubmit} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default RegisterPage;
