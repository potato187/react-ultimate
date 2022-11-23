import { uuid, checkPassword, checkIfFileIsCorrectType, checkIfFileIsTooBig } from '@/helpers';
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
		label: 'User',
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
};

export const EXAMS_DIFFICULTY = [
	{
		key: uuid(),
		value: 'easy',
		label: 'Easy',
	},
	{
		key: uuid(),
		value: 'medium',
		label: 'Medium',
	},
	{
		key: uuid(),
		value: 'hard',
		label: 'Hard',
	},
];

export const examSchema = {
	name: yup.string().required('Quiz name is required').min(3, 'Quiz name must be at least 3 characters'),
	difficulty: yup.string().test('typeDifficulty', (value) => {
		return EXAMS_DIFFICULTY.find((type) => type.value === value);
	}),
	description: yup.string().required('Quiz description is required'),
};
