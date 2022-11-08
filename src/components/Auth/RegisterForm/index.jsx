import ThemeButton from '@components/ThemeButton';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { userSchema } from '@schema';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomField from '@components/CustomField';
import style from '../Layout/style.module.scss';

const RegisterForm = ({ onSubmit }) => {
	const schema = yup.object().shape({
		username: userSchema.username,
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
			username: '',
			email: '',
			password: '',
		},
		resolver: yupResolver(schema),
	});

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className={style['page-auth__form']}>
				<div className={`${style['auth-form__header']} text-center`}>
					<h1 className={style['auth-form__title']}>Register Account</h1>
					<div className={style['auth-form__subtitle']}>Hello, who’s this?</div>
				</div>
				<div className={style['auth-form__body']}>
					<div className={style['auth-form__group']}>
						<CustomField control={control} name='username' type='text' label='Username' placeholder='Your username' />
					</div>
					<div className={style['auth-form__group']}>
						<CustomField control={control} name='email' type='email' label='email' placeholder='Your email' />
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
					<ThemeButton
						isLoading={isSubmitting}
						type='submit'
						data-button='dark md'
						className='w-100'
						title='Register Account'
					/>
				</div>
			</form>
		</>
	);
};

export default RegisterForm;
