import ThemeButton from '@components/ThemeButton';
import { ACTION_TYPE } from '@constant';
import { typeOf, uuid } from '@helpers/index';
import SelectField from '@pages/Admin/components/SelectField';
import React, { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';

import FieldQuestion from '../FieldQuestion';
import { ProviderQuestions } from '../hooks/useQuestion';

const ModalQuestions = ({ onSubmit = null, quizzes = [], addQuestion = null, ...props }) => {
	const { control, handleSubmit, setValue } = useForm({
		mode: 'onChange',
		defaultValues: {
			quizId: '',
		},
	});

	return (
		<ProviderQuestions>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FieldQuestion quizzes={quizzes} />
				<div className='text-center'>
					<ThemeButton type='submit' title='Create Questions' />
				</div>
			</form>
		</ProviderQuestions>
	);
};

export default ModalQuestions;
