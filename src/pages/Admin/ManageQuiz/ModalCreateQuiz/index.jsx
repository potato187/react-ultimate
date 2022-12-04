import ThemeButton from '@components/ThemeButton';
import { typeOf, uuid } from '@helpers/index';
import { yupResolver } from '@hookform/resolvers/yup';
import useToggle from '@hooks/useToggle';
import InputField from '@pages/Admin/components/InputField';
import SelectOptions from '@pages/Admin/components/SelectOptions';
import { EXAMS_DIFFICULTY } from '@schema';
import { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import * as yup from 'yup';
import FieldQuestion from '../FieldQuestion';
import ImageField from '../ImageField';

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
		name: yup.string().required('The name quiz is required'),
		description: yup.string().required('The description quiz is required'),
		question: yup.array().of(
			yup.object().shape({
				description: yup.string().required('Question is required'),
				questionImage: yup
					.mixed()
					.test('fileSize', 'The file is too large', (file) => {
						if (typeOf(file) === 'string' && file.trim().length === 0) return true;
						return file && file[0].size <= 8000000;
					})
					.test('fileExtension', 'The file extension is invalid', (file) => {
						let isValid = true;
						if (typeOf(file) === 'string' && file.trim().length === 0) return true;
						if (!file || (file && !file[0])) return false;
						return ['image/jpg', 'image/jpeg', 'image/png'].some((extension) => extension === file[0].type);
					}),
				answers: yup.array().of(
					yup.object().shape({
						isCorrect: yup.bool(),
						description: yup.string().required('Answer is required'),
					})
				),
			})
		),
	});

	const methods = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			description: '',
			quizImage: '',
			difficulty: EXAMS_DIFFICULTY[0].value,
			question: [
				{
					description: '',
					questionImage: '',
					answers: [{ description: '', isCorrect: false }],
				},
			],
		},
	});

	const {
		fields: fieldQuestions,
		append,
		remove,
	} = useFieldArray({
		control: methods.control,
		name: 'question',
	});

	const [previewImage, setPreviewImage] = useState('');
	const [isOpenLightBox, handleToggleLightBox] = useToggle(false);

	const handleAddQuestion = () => {
		append({ description: '', questionImage: '', answers: [{ description: '', isCorrect: false }] });
	};

	const handleRemoveQuestion = (questionIndex) => {
		remove(questionIndex);
	};

	const handleSetPreviewImage = (image) => {
		if (image && image[0]) {
			setPreviewImage(URL.createObjectURL(image[0]));
			handleToggleLightBox(true);
		}
	};

	return (
		<>
			<FormProvider
				handleSetPreviewImage={handleSetPreviewImage}
				removeQuestion={handleRemoveQuestion}
				appendQuestion={handleAddQuestion}
				{...methods}>
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
							<div className='col-12'>
								{fieldQuestions.map((_, index) => (
									<FieldQuestion key={uuid()} questionIndex={index} />
								))}
							</div>
							<div className='col-12'>
								<div className='text-center'>
									<ThemeButton data-button='md' title='Create Quiz' type='submit' />
								</div>
							</div>
						</div>
					</Form>
				</Modal.Body>
			</FormProvider>
			<Lightbox open={isOpenLightBox} close={() => handleToggleLightBox(false)} slides={[{ src: previewImage }]} />
		</>
	);
};

export default ModalCreateQuiz;
