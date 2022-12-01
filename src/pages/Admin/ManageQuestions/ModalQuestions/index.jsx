import ThemeButton from '@components/ThemeButton';
import { yupResolver } from '@hookform/resolvers/yup';
import SelectField from '@pages/Admin/components/SelectField';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import FromGroupQuestions from '../FromGroupQuestions';
import 'yet-another-react-lightbox/styles.css';
import Lightbox from 'yet-another-react-lightbox';
import useToggle from '@hooks/useToggle';
import { useState } from 'react';
import { typeOf, useImageBase64 } from '@helpers/index';

const ModalQuestions = ({ onSubmit = null, quizzes = [], addQuestion = null, ...props }) => {
	const schema = yup.object().shape({
		quizId: yup.string().required('The quiz is required'),
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
		defaultValues: {
			quizId: quizzes[0].value,
			question: [],
		},
		resolver: yupResolver(schema),
	});
	const [previewImage, setPreviewImage] = useState('');
	const [isOpen, handleOpen] = useToggle();

	const handleOpenLightBox = (image) => {
		if (image && image[0]) {
			setPreviewImage(URL.createObjectURL(image[0]));
			handleOpen(true);
		}
	};

	useEffect(() => {
		methods.setValue('question', [
			{ description: '', questionImage: '', answers: [{ description: 'A', isCorrect: true }] },
		]);
	}, []);

	return (
		<>
			<FormProvider handleOpenLightBox={handleOpenLightBox} {...methods}>
				<form onSubmit={methods.handleSubmit((data) => onSubmit(data, methods.reset))}>
					<SelectField control={methods.control} name='quizId' options={quizzes} />
					<FromGroupQuestions />
					<div className='text-center'>
						<ThemeButton type='submit' title='Create Questions' />
					</div>
				</form>
			</FormProvider>
			<Lightbox open={isOpen} close={() => handleOpen(false)} slides={[{ src: previewImage }]} />
		</>
	);
};

export default ModalQuestions;
