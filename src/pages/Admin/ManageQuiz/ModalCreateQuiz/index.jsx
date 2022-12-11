import ThemeButton from '@components/ThemeButton';
import { MODAL as MODAL } from '@constant';
import { typeOf, useImageBase64, uuid } from '@helpers/index';
import { yupResolver } from '@hookform/resolvers/yup';
import useToggle from '@hooks/useToggle';
import InputField from '@pages/Admin/components/InputField';
import SelectOptions from '@pages/Admin/components/SelectOptions';
import { EXAMS_DIFFICULTY } from '@schema';
import { useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import * as yup from 'yup';
import FieldQuestion from '../FieldQuestion';
import ImageField from '../ImageField';
import imagePlaceHolder from '@assets/images/placeholder.png';

const { MODAL_CREATE, MODAL_UPDATE, MODAL_VIEW } = MODAL;

const ModalCreateQuiz = ({ modal = MODAL_CREATE, quiz = {}, onSubmit = null, ...props }) => {
	const schema = yup.object().shape({
		name: yup.string().required('The name quiz is required'),
		description: yup.string().required('The description quiz is required'),
		question: yup.array().of(
			yup.object().shape({
				description: yup.string().required('Question is required'),
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
					imageFile: '',
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
	const isDisabled = modal === MODAL_VIEW;

	const handleAddQuestion = () => {
		append({ description: '', imageFile: '', answers: [{ description: '', isCorrect: false }] });
	};

	const handleRemoveQuestion = (questionIndex) => {
		remove(questionIndex);
	};

	const handleSetPreviewImage = (image) => {
		if (image && image[0]) {
			const newImage = typeOf(image) === 'string' ? useImageBase64(image) : URL.createObjectURL(image[0]);
			setPreviewImage(newImage);
			handleToggleLightBox(true);
		}
	};

	useEffect(() => {
		const check = [MODAL_VIEW, MODAL_UPDATE].includes(modal) && Object.keys(quiz).length > 0;
		methods.setValue('name', check ? quiz?.name : '');
		methods.setValue('description', check ? quiz?.description : '');
		methods.setValue('difficulty', check ? quiz?.difficulty : EXAMS_DIFFICULTY[0].value);
		methods.setValue('quizImage', check ? quiz?.image : '');
		methods.setValue(
			'question',
			check && quiz?.question && quiz.question.length > 0
				? quiz?.question
				: [
						{
							description: '',
							imageFile: '',
							answers: [{ description: '', isCorrect: false }],
						},
				  ]
		);
		if (modal === MODAL_UPDATE) {
			methods.setValue('id', check ? quiz?.quizId : '');
		}
	}, []);

	return (
		<>
			<FormProvider
				handleSetPreviewImage={handleSetPreviewImage}
				removeQuestion={handleRemoveQuestion}
				appendQuestion={handleAddQuestion}
				modal={modal}
				{...methods}>
				<Modal.Body>
					<Form onSubmit={methods.handleSubmit(onSubmit)}>
						<div className='row gy-4'>
							<div className='col-4'>
								<ImageField name='quizImage' disabled={isDisabled} />
							</div>
							<div className='col-8'>
								<InputField name='name' label='Name' placeholder='Enter  quiz name' disabled={isDisabled} />
								<InputField
									name='description'
									label='Description'
									placeholder='Enter  quiz description'
									disabled={isDisabled}
								/>
								<SelectOptions
									options={EXAMS_DIFFICULTY}
									name='difficulty'
									label='Difficulty'
									isDisabled={isDisabled}
								/>
							</div>
							<div className='col-12'>
								{fieldQuestions.map((_, index) => (
									<FieldQuestion key={uuid()} questionIndex={index} isDisabled={isDisabled} />
								))}
							</div>
							<div className='col-12'>
								<div className='text-center'>
									{modal !== MODAL_VIEW ? (
										<ThemeButton
											data-button='md'
											title={`${modal === MODAL_CREATE ? 'Create Quiz' : 'Update Quiz'}`}
											type='submit'
										/>
									) : null}
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
