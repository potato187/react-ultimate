import questionApi from '@api/questionApi';
import quizApi from '@api/quizApi';
import ModalBase from '@components/ModalBase';
import ThemeButton from '@components/ThemeButton';
import { uuid } from '@helpers/index';
import useToggle from '@hooks/useToggle';
import { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { MdDashboardCustomize } from 'react-icons/md';
import { toast } from 'react-toastify';
import ThemeBreadcrumb from '../components/ThemeBreadcrumb';
import style from '../Layout/style.module.scss';
import ModalQuestions from './ModalQuestions';

const breadcrumb = [
	{
		id: uuid(),
		to: '/',
		title: 'Admin',
	},
	{
		id: uuid(),
		to: '/',
		title: 'Manage Questions',
		active: true,
	},
];

const ManageQuestions = () => {
	const [quizzes, setQuizzes] = useState([]);
	const [isOnModal, toggleModal] = useToggle(false);

	const handleOpenModal = () => {
		toggleModal(true);
	};

	const handleOnSubmit = async (data, reset) => {
		const { quizId, question: questions } = data;
		let isSuccess = true;
		for (const question of questions) {
			const { description, questionImage, answers } = question;
			const response = await questionApi.createQuestion({ quizId, description, questionImage });
			if (response && response.EC !== 0) {
				isSuccess = false;
				break;
			}
			for (const answer of answers) {
				const { description, isCorrect } = answer;
				const response2 = await questionApi.createAnswer({ question_id: response.DT.id, description, isCorrect });
				if (response2 && response2.EC !== 0) {
					isSuccess = false;
					break;
				}
			}
		}
		if (isSuccess) {
			toast.success('Create questions and answers are success');
			reset();
			toggleModal(false);
		} else {
			toast.error('Can not create question and answer');
		}
	};

	useEffect(() => {
		(async () => {
			const response = await quizApi.getAllQuiz();
			if (response && response.EC === 0) {
				const clone = response.DT.map((quiz) => ({
					value: quiz.id,
					label: `${quiz.description} - ${quiz.difficulty}`,
				}));
				setQuizzes(clone);
			}
		})();
	}, []);

	return (
		<>
			<div className={style['admin-page']}>
				<div className={style['admin-page__section']}>
					<ThemeBreadcrumb title='Manage Quizzes' breadcrumb={breadcrumb} icon={() => <MdDashboardCustomize />} />
					<div className={style['section']}>
						<div className={style['section-title']}>
							<Row className='align-items-center'>
								<Col md='6'>Questions</Col>
								<Col md='6' className='text-end'>
									<ThemeButton className='button ml-auto' title='Add Questions' onClick={handleOpenModal} />
								</Col>
							</Row>
						</div>
						<div className={style['section-main']}></div>
					</div>
				</div>
			</div>
			<ModalBase data-modal='md' title='Create Question' show={isOnModal} handleClose={() => toggleModal(true)}>
				<Modal.Body>
					<ModalQuestions onSubmit={handleOnSubmit} quizzes={quizzes} />
				</Modal.Body>
			</ModalBase>
		</>
	);
};

export default ManageQuestions;
