import ThemeButton from '@components/ThemeButton';
import { typeOf } from '@helpers/index';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '@pages/Admin/components/InputField';
import { Form, Modal } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import ImageField from '../ImageField';
import { EXAMS_DIFFICULTY } from '@schema';
import SelectOptions from '@pages/Admin/components/SelectOptions';

const ModalCreateQuiz = ({ quiz = {}, onSubmit = null, ...props }) => {
	const schema = yup.object().shape({
		quizImage: yup
			.mixed()
			.transform((files) => (files.length === 0 ? '' : files))
			.test('fileSize', 'The file is too large', (files) => {
				if (typeOf(files) === 'string') return true;
				return files.length > 0 && files[0]?.size && files[0].size <= 8000000;
			})
			.test('fileExtension', 'The file extension is invalid', (files) => {
				if (typeOf(files) === 'string') return true;
				return (
					files.length > 0 && ['image/jpg', 'image/jpeg', 'image/png'].some((extension) => extension === files[0].type)
				);
			}),
	});

	const methods = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			description: '',
			quizImage: '',
			difficulty: EXAMS_DIFFICULTY[0].value,
		},
	});

	return (
		<FormProvider {...methods}>
			<Modal.Body>
				<Form onSubmit={methods.handleSubmit(onSubmit)}>
					<div className='row gy-4'>
						<div className='col-4'>
							<ImageField name='quizImage' />
						</div>
						<div className='col-8'>
							<InputField name='name' label='Name' placeholder='Enter  quiz name' />
							<InputField name='description' label='Description' placeholder='Enter  quiz description' />
							<SelectOptions options={EXAMS_DIFFICULTY} name='difficulty' label='Difficulty' />
						</div>
						<div className='col-8 offset-4'>
							<div className='text-center'>
								<ThemeButton data-button='md' title='Create Quiz' type='submit' />
							</div>
						</div>
					</div>
				</Form>
			</Modal.Body>
		</FormProvider>
	);
};

export default ModalCreateQuiz;
