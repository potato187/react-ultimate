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
import { useImageBase64 } from '@helpers/index';
import DefaultAvatar from '@assets/images/user.png';

const FormCreateUser = ({ onSubmit = null, user = {}, modalType = MODAL_TYPE.MODAL_CREATE, ...props }) => {
	const { MODAL_CREATE, MODAL_VIEW, MODAL_UPDATE } = MODAL_TYPE;
	const schema = { ...userSchema };
	const isDisabled = modalType === MODAL_VIEW;
	const isShowing = modalType !== MODAL_VIEW;
	const isViewOrUpdate = [MODAL_VIEW, MODAL_UPDATE].includes(modalType);
	const defaultValues = {
		username: '',
		email: '',
		password: '',
		role: '',
		userImage: null,
	};

	if (isViewOrUpdate) {
		delete defaultValues.password;
		delete schema.password;
	}

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
		resolver: yupResolver(yup.object().shape({ ...schema })),
		defaultValues,
	});

	/* 	React.useEffect(() => {
		reset();
	}, [isSubmitSuccessful]); */

	useEffect(() => {
		if (isViewOrUpdate && Object.keys(user).length > 0) {
			setValue('username', user?.username);
			setValue('email', user?.email);
			setValue('role', user?.role);
			setValue('userImage', user?.image);
		} else {
			reset();
		}
	}, [modalType]);

	const handleSetValue = async (name, value) => {
		setValue(name, value);
		await trigger(name);
	};

	const handleOnSubmit = (data) => {
		const formData = new FormData();
		for (const name in data) {
			if (name === 'userImage' && data[name] && data[name][0]) {
				formData.append(name, data[name][0]);
			} else {
				formData.append(name, data[name]);
			}
		}

		if (modalType === MODAL_UPDATE) {
			formData.append('id', user.id);
		}
		onSubmit(formData);
	};

	return (
		<Modal.Body>
			<Form onSubmit={handleSubmit(handleOnSubmit)}>
				<Row>
					<Col md={4}>
						<AvatarField
							register={register}
							defaultAvatarUser={isViewOrUpdate && user && user.image ? useImageBase64(user.image) : DefaultAvatar}
							errors={errors}
							name='userImage'
							isSubmitSuccessful={isSubmitSuccessful}
							handleSetValue={handleSetValue}
						/>
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
							disabled={isViewOrUpdate}
						/>
						{modalType === MODAL_CREATE ? (
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
						{modalType !== MODAL_VIEW ? (
							<div className='text-center'>
								<ThemeButton
									isLoading={isSubmitting}
									data-button={`${isSubmitting ? 'loading' : ''} sm`}
									type='submit'
									title={`${modalType === MODAL_CREATE ? 'Create User' : 'Update User'}`}
								/>
							</div>
						) : null}
					</Col>
				</Row>
			</Form>
		</Modal.Body>
	);
};

export default FormCreateUser;
