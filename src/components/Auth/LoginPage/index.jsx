import React, { useEffect } from 'react';
import authApi from '@api/authApi';
import LoginForm from '../LoginForm';
import style from '../Layout/style.module.scss';
import {useDispatch} from "react-redux";
import {userLogin} from "@redux/action/userAction.js";
import {useNavigate} from "react-router-dom";
import {PATH_ROUTES} from "@constant";

const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleOnSubmit = async (data) => {
		const response = await authApi.login({ ...data });
		dispatch(userLogin(response));
		navigate(PATH_ROUTES.USER.INDEX);
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
