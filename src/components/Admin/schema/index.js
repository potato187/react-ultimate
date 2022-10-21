import { uuid, checkPassword, checkIfFileIsCorrectType } from '@/helpers';
import * as yup from 'yup';

export const Role = [
	{
		key: uuid(),
		value: 'ADMIN',
	},
	{
		key: uuid(),
		value: 'USER',
	},
];

export const userSchema = {
	username: yup.string().required('Full name is required').min(3, '3 characters'),
	email: yup.string().required('Email is required').email('Your email is invalid'),
	password: yup.string().required('Password is required').test('password', 'Password is weak', checkPassword),
	role: yup
		.string()
		.test('typeRole', 'Role is invalid', (value) => Role.find((role) => role.value === value))
		.required('Role is required'),
	userImage: yup
		.mixed()
		.transform((value) => (value ? value : null))
		.test('fileType', 'The File is correct type', checkIfFileIsCorrectType),
};
