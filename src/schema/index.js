import { uuid, checkPassword, checkIfFileIsCorrectType } from '@/helpers';
import * as yup from 'yup';

export const Role = [
	{
		key: uuid(),
		value: 'ADMIN',
		label: 'Amin',
	},
	{
		key: uuid(),
		value: 'USER',
		label: 'User'
	},
];

export const userSchema = {
	username: yup.string().required('Full name is required').min(3, '3 characters'),
	email: yup.string().required('Email is required').email('Your email is invalid'),
	password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
	role: yup
		.string()
		.test('typeRole', 'Role is invalid', (value) => Role.find((role) => role.value === value))
		.required('Role is required'),
	userImage: yup
		.mixed()
		.transform((value) => (value ? value : null))
		.test('fileType', 'The File is correct type', checkIfFileIsCorrectType),
};


export const examSchema = {};
export const EXAMS_DIFFICULTY = [];