import quizApi from '@api/quizApi';
import ModalBase from '@components/ModalBase';
import ThemeButton from '@components/ThemeButton';
import { uuid } from '@helpers/index';
import useToggle from '@hooks/useToggle';
import { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { MdDashboardCustomize } from 'react-icons/md';
import ThemeBreadcrumb from '../components/ThemeBreadcrumb';
import style from '../Layout/style.module.scss';
import { ProviderQuestions } from './hooks/useQuestion';
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

	const handleAddQuestion = (quizId, question) => {
		console.log(quizId, question);
	};

	const handleOnSubmit = (data) => {
		console.log(data);
	};

	useEffect(() => {
		(async () => {
			const response = await quizApi.getAllQuiz();
			if (response && response.EC === 0) {
				setQuizzes(response.DT);
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
