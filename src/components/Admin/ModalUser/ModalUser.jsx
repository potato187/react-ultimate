import { checkIfFileIsCorrectType, checkPassword, uuid } from '@/helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import AvatarField from '../AvatarField';
import CustomField from '../CustomField/CustomField';
import SelectField from '../SelectField';

import CustomButton from '../../CustomButton';

const options = [
	{
		key: uuid(),
		value: 'ADMIN',
	},
	{
		key: uuid(),
		value: 'USER',
	},
];

const ModalUser = ({ show: passShow = false, handleClose = null, onSubmit = null, ...props }) => {
	const schema = yup.object().shape({
		username: yup.string().required('Please fill name').min(3, '3 characters'),
		email: yup.string().required('Please fill email').email('Your email is invalid'),
		password: yup.string().required('Please fill password').test('password', 'Password is weak', checkPassword),
		role: yup.string().oneOf(['ADMIN', 'USER'], 'Please select role'),
		userImage: yup
			.mixed()
			.transform((value) => (value ? value : null))
			.test('fileType', 'The File is correct type', checkIfFileIsCorrectType),
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
			password: '',
			email: '',
			role: '',
			userImage: null,
		},
	});

	React.useEffect(() => {
		reset();
	}, [isSubmitSuccessful]);

	const handleSetValue = (name, value) => {
		setValue(name, value);
		trigger(name);
	};

	const handleLoading = (newState) => {
		setLoading(newState);
	};

	return (
		<>
			<Modal show={passShow} onHide={handleClose} backdrop='static' keyboard={false} size='lg' {...props}>
				<Modal.Header closeButton>
					<Modal.Title>Add User</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Modal.Body>
						<Row>
							<Col md={4}>
								<AvatarField
									register={register}
									errors={errors}
									name='userImage'
									isSubmitSuccessful={isSubmitSuccessful}
								/>
							</Col>
							<Col md={8}>
								<CustomField
									control={control}
									name='username'
									type='text'
									placeholder='Enter your name'
									label='Full Name'
								/>
								<CustomField
									control={control}
									name='email'
									type='email'
									placeholder='Enter email'
									label='Email address'
								/>
								<CustomField
									control={control}
									name='password'
									type='password'
									autoComplete='on'
									placeholder='Enter password'
									label='Enter password'
								/>
								<SelectField
									control={control}
									name='role'
									placeholder='Select Role'
									label='Role'
									options={options}
									handleSetValue={handleSetValue}
								/>
								<CustomButton isLoading={isSubmitting} type='submit' title='Submit' />
							</Col>
						</Row>
					</Modal.Body>
				</Form>
			</Modal>
		</>
	);
};

export default ModalUser;
