import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import CustomButton from '../../CustomButton';
import AvatarField from '../AvatarField';
import CustomField from '../CustomField/CustomField';
import { Role, userSchema } from '../schema';
import SelectField from '../SelectField';

const FormViewAndEditUser = ({ title = 'Add Users', user = {}, disabled = false, onSubmit, ...props }) => {
	const schema = yup.object().shape({
		username: userSchema.username,
		role: userSchema.role,
	});

	const {
		handleSubmit,
		setValue,
		trigger,
		register,
		reset,
		control,
		formState: { isSubmitting, isSubmitSuccessful },
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema),
		defaultValues: {
			username: '',
			role: '',
			userImage: null,
		},
	});

	const handleSetValue = (name, value) => {
		setValue(name, value);
		trigger(name);
	};

	const handleLoading = (newState) => {
		setLoading(newState);
	};

	const updateUser = (data) => {
		const formData = new FormData();
		for (const name in data) {
			formData.append(name, data[name]);
		}
		onSubmit(formData);
	};

	React.useEffect(() => {
		reset();
	}, [isSubmitSuccessful]);

	React.useEffect(() => {
		if (user && Object.entries(user).length > 0) {
			for (let name in user) {
				setValue(name, user[name]);
			}
		}
	}, [user]);

	return (
		<Form onSubmit={handleSubmit(updateUser)}>
			<Row>
				<Col md={4}>
					<AvatarField
						register={register}
						errors={errors}
						name='userImage'
						isSubmitSuccessful={isSubmitSuccessful}
						disabled={disabled}
					/>
				</Col>
				<Col md={8}>
					<CustomField
						control={control}
						name='username'
						type='text'
						placeholder='Enter your name'
						label='Full Name'
						disabled={disabled}
					/>
					{disabled && (
						<CustomField
							control={control}
							name='email'
							type='email'
							placeholder='Enter email'
							label='Email address'
							disabled={disabled}
						/>
					)}
					<SelectField
						control={control}
						name='role'
						placeholder='Select Role'
						label='Role'
						options={Role}
						handleSetValue={handleSetValue}
						disabled={disabled}
					/>
					{!disabled && <CustomButton isLoading={isSubmitting} type='submit' title='Update User' />}
				</Col>
			</Row>
		</Form>
	);
};

export default FormViewAndEditUser;
