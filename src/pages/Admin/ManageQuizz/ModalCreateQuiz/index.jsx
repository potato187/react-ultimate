import { Form, Modal, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomField from '@components/CustomField';
import React from 'react';
import { EXAMS_DIFFICULTY, examSchema } from '@schema';
import SelectField from '@pages/Admin/components/SelectField';
import * as yup from 'yup';
import ThemeButton from '@components/ThemeButton/index.jsx';
import ImageField from '@pages/Admin/ManageQuizz/ImageField';
import { useEffect } from 'react';
import { MODAL_TYPE } from '@constant';

const ModalCreateExam = ({
	modalType = MODAL_TYPE.MODAL_CREATE,
	quiz = {},
	onSubmit = null,
	handleToggle = null,
	...props
}) => {
	const schema = yup.object().shape({ ...examSchema });
	const shouldDisabled = modalType === MODAL_TYPE.MODAL_VIEW;
	const {
		handleSubmit,
		control,
		setValue,
		reset,
		formState: { isSubmitting, isSubmitSuccessful, errors },
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			description: '',
			difficulty: '',
			quizImage: '',
		},
	});

	const handleSetValue = (name, value) => {
		setValue(name, value);
	};

	const handleCreatQuiz = (data) => {
		onSubmit && onSubmit(data);
	};

	const handleCloseModel = () => {
		if (handleToggle) {
			handleToggle(false);
		}
	};

	useEffect(() => {
		reset();
	}, [isSubmitSuccessful]);

	useEffect(() => {
		if (modalType !== MODAL_TYPE.MODAL_CREATE && Object.keys(quiz).length > 0) {
			setValue('id', quiz?.id);
			setValue('name', quiz?.name);
			setValue('difficulty', quiz?.difficulty);
			setValue('description', quiz?.description);
			setValue('quizImage', quiz?.image);
		} else {
			setValue('difficulty', EXAMS_DIFFICULTY[0].value);
		}
	}, []);

	return (
		<>
			<Modal.Body>
				<Form onSubmit={handleSubmit(handleCreatQuiz)}>
					<Row>
						<div className='col-4'>
							<ImageField
								name='quizImage'
								errors={errors}
								disabled={shouldDisabled}
								handleSetValue={handleSetValue}
								defaultValue={quiz.image}
							/>
						</div>
						<div className='col-8'>
							<CustomField
								control={control}
								name='name'
								type='text'
								placeholder='Enter quiz name'
								label='Quiz name: '
								disabled={shouldDisabled}
							/>
							<SelectField
								options={EXAMS_DIFFICULTY}
								control={control}
								name='difficulty'
								label='Quiz difficulty: '
								className='z-index-2'
								disabled={shouldDisabled}
							/>
							<CustomField
								as='textarea'
								rows='4'
								control={control}
								name='description'
								type='text'
								className='position-relative'
								placeholder='Enter quiz description'
								label='Quiz Description: '
								disabled={shouldDisabled}
							/>
						</div>
						<div className='col-8 offset-4'>
							<div className='text-end'>
								{[MODAL_TYPE.MODAL_CREATE, MODAL_TYPE.MODAL_UPDATE].includes(modalType) ? (
									<ThemeButton
										isLoading={isSubmitting}
										data-button={`${isSubmitting ? 'loading' : ''}`}
										type='submit'
										title={modalType === MODAL_TYPE.MODAL_CREATE ? 'Create Quiz' : 'Update Quiz'}
									/>
								) : (
									<ThemeButton type='button' data-button='secondary' title='Close' onClick={handleCloseModel} />
								)}
							</div>
						</div>
					</Row>
				</Form>
			</Modal.Body>
		</>
	);
};

export default ModalCreateExam;
