import ThemeButton from '@components/ThemeButton';
import CustomField from '@components/CustomField';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '@schema';
import { useForm } from 'react-hook-form';
import { AiOutlineHome } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import style from '../Layout/style.module.scss';
import {PATH_ROUTES} from "@constant";

const LoginForm = ({ onSubmit }) => {
	const schema = yup.object().shape({
		email: userSchema.email,
		password: userSchema.password,
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting, isSubmitSuccessful },
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(schema),
	});

	const navigate = useNavigate();

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className={style['page-auth__form']}>
				<div className={style['auth-form__header']}>
					<h1 className={style['auth-form__title']}>Login Quiz App</h1>
					<div className={style['auth-form__subtitle']}>Welcome back !</div>
				</div>
				<div className={style['auth-form__body']}>
					<div className={style['auth-form__group']}>
						<CustomField control={control} name='email' type='email' label='Email' placeholder='Your email' />
					</div>
					<div className={style['auth-form__group']}>
						<CustomField
							control={control}
							name='password'
							type='password'
							label='Password'
							placeholder='Your password'
						/>
					</div>
				</div>
				<div className={style['auth-form__footer']}>
					<div className='mb-2'>
						<button className='button-link' onClick={() => navigate(`../${PATH_ROUTES.AUTH.REGISTER}`)}>
							Don't have an account yet?
						</button>
					</div>
					<div className='mb-2'>
						<ThemeButton
							type='submit'
							data-button='dark md'
							isLoading={isSubmitting}
							className='w-100'
							title='Log in with us'
						/>
					</div>
					<div className='text-center'>
						<div className={style['footer-separation']}>
							<span>OR</span>
						</div>
						<button className='button-link' onClick={() => navigate(PATH_ROUTES.USER.INDEX)}>
							<AiOutlineHome color='currentColor' />
							<span className='ms-2'> Go home back</span>
						</button>
					</div>
				</div>
			</form>
		</>
	);
};

export default LoginForm;
