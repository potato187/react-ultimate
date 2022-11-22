import { Role, userSchema } from '@schema';
import ThemeButton from '@components/ThemeButton';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import AvatarField from '../../components/AvatarField';
import SelectField from '../../components/SelectField';
import CustomField from '@components/CustomField';
import { MODAL_TYPE } from '@constant';

const FormCreateUser = ({ onSubmit = null, user = {}, modalType = MODAL_TYPE.MODAL_CREATE, ...props }) => {
	const schema = yup.object().shape({ ...userSchema });
	const isDisabled = modalType === MODAL_TYPE.MODAL_VIEW;
	const isShowing = modalType !== MODAL_TYPE.MODAL_VIEW;
	const {
		handleSubmit,
		setValue,
		trigger,
		register,
		reset,
		control,
		formState: { isSubmitting, isSubmitSuccessful, errors },
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema),
		defaultValues: {
			username: '',
			password: '',
			email: '',
			role: '',
			userImage: null,
		},
	});

	/* 	React.useEffect(() => {
		reset();
	}, [isSubmitSuccessful]); */

	useEffect(() => {
		if (isDisabled && Object.keys(user).length > 0) {
			setValue('username', user?.username);
			setValue('email', user?.email);
			setValue('role', user?.role);
		}
	}, []);

	const handleSetValue = async (name, value) => {
		setValue(name, value);
		await trigger(name);
	};

	const createUser = (data) => {
		const formData = new FormData();
		for (const name in data) {
			if (name === 'userImage' && data[name] && data[name][0]) {
				formData.append(name, data[name][0]);
			} else {
				formData.append(name, data[name]);
			}
		}
		onSubmit(formData);
	};

	return (
		<Modal.Body>
			<Form onSubmit={handleSubmit(createUser)}>
				<Row>
					<Col md={4}>
						<AvatarField register={register} errors={errors} name='userImage' isSubmitSuccessful={isSubmitSuccessful} />
					</Col>
					<Col md={8}>
						<CustomField
							control={control}
							name='username'
							type='text'
							placeholder='Enter your name'
							label='Full Name'
							disabled={isDisabled}
						/>
						<CustomField
							control={control}
							name='email'
							type='email'
							placeholder='Enter email'
							label='Email address'
							disabled={isDisabled}
						/>
						{isShowing ? (
							<CustomField
								control={control}
								name='password'
								type='password'
								autoComplete='on'
								placeholder='Enter password'
								label='Enter password'
								disabled={isDisabled}
							/>
						) : null}
						<SelectField
							control={control}
							name='role'
							placeholder='Select Role'
							label='Role'
							options={Role}
							handleSetValue={handleSetValue}
							disabled={isDisabled}
						/>
						<ThemeButton
							isLoading={isSubmitting}
							data-button={`${isSubmitting ? 'loading' : ''}`}
							type='submit'
							title='Create User'
						/>
					</Col>
				</Row>
			</Form>
		</Modal.Body>
	);
};

export default FormCreateUser;
