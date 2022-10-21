import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import CustomButton from '../../CustomButton';
import AvatarField from '../AvatarField';
import CustomField from '../CustomField/CustomField';
import { Role, userSchema } from '../schema';
import SelectField from '../SelectField';

const FormCreateUser = ({ onSubmit = null, ...props }) => {
	const schema = yup.object().shape({ ...userSchema });

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
		<Form onSubmit={handleSubmit(createUser)}>
			<Row>
				<Col md={4}>
					<AvatarField register={register} errors={errors} name='userImage' isSubmitSuccessful={isSubmitSuccessful} />
				</Col>
				<Col md={8}>
					<CustomField control={control} name='username' type='text' placeholder='Enter your name' label='Full Name' />
					<CustomField control={control} name='email' type='email' placeholder='Enter email' label='Email address' />
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
						options={Role}
						handleSetValue={handleSetValue}
					/>
					<CustomButton isLoading={isSubmitting} type='submit' title='Create User' />
				</Col>
			</Row>
		</Form>
	);
};

export default FormCreateUser;
