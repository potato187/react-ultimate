import ThemeButton from '@components/ThemeButton';
import { yupResolver } from '@hookform/resolvers/yup';
import SelectField from '@pages/Admin/components/SelectField';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import FromGroupQuestions from '../FromGroupQuestions';

const ModalQuestions = ({ onSubmit = null, quizzes = [], addQuestion = null, ...props }) => {
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {
			quizId: quizzes[0].value,
			question: [],
		},
	});

	useEffect(() => {
		methods.setValue('question', [
			{ description: '', questionImage: '', answers: [{ description: 'A', isCorrect: true }] },
		]);
	}, []);

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<SelectField control={methods.control} name='quizId' options={quizzes} />
				<FromGroupQuestions />
				<div className='text-center'>
					<ThemeButton type='submit' title='Create Questions' />
				</div>
			</form>
		</FormProvider>
	);
};

export default ModalQuestions;
